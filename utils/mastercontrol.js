// /utils/mastercontrol.js

const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const dataRepository = require('./dataRepository'); // Replace with the actual path

AWS.config.update({ region: 'us-west-1' });

const secretKey = '1234'; // Replace with a strong secret key

function checkCredentials(username, password) {
  const users = dataRepository.getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user !== undefined;
}

function generateToken(username) {
  return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

function getUserByUsername(username) {
  const users = dataRepository.getUsers();
  return users.find(u => u.username === username);
}

function getLabContent(username, labId) {
  const user = getUserByUsername(username);
  if (!user) {
    throw { status: 'error', message: 'User not found' };
  }

  const labs = dataRepository.getLabs();
  const lab = labs[labId];
  if (!lab) {
    throw { status: 'error', message: 'Lab not found' };
  }

  return { labId: lab.id, title: lab.title, content: lab.content };
}

function createAndTagEC2Instance(username) {
  const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

  const user = getUserByUsername(username);
  if (!user) {
    throw { status: 'error', message: 'User not found' };
  }

  if (user.instanceId) {
    throw { status: 'error', message: 'User already has an active instance' };
  }

  const instanceParams = {
    ImageId: 'ami-04f2560e04b209c18',
    InstanceType: 't2.medium',
    KeyName: 'kali-dev-master',
    MinCount: 1,
    MaxCount: 1,
    SecurityGroupIds: ['sg-0b2b11a6fa15acdec']
  };

  return ec2.runInstances(instanceParams).promise()
    .then(data => {
      const instanceId = data.Instances[0].InstanceId;
      user.instanceId = instanceId;

      const tagParams = {
        Resources: [instanceId],
        Tags: [
          {
            Key: 'Name',
            Value: 'Tome-API',
          },
          {
            Key: 'Timeout',
            Value: 'True',
          }
        ],
      };

      return ec2.createTags(tagParams).promise().then(() => instanceId);
    })
    .catch(err => {
      console.error('Error in createAndTagEC2Instance:', err.message);
      // Set user's instanceId to null to avoid inconsistencies
      user.instanceId = null;
      throw { status: 'error', message: err.message };
    });
}

function getUserInstance(username) {
  const user = getUserByUsername(username);
  if (!user || !user.instanceId) {
    throw { status: 'error', message: 'User not found or does not have an active instance' };
  }

  const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

  const params = {
    InstanceIds: [user.instanceId],
  };

  return ec2.describeInstances(params).promise()
    .then(data => {
      const instance = data.Reservations[0].Instances[0];
      return {
        instanceId: instance.InstanceId,
        publicIpAddress: instance.PublicIpAddress,
      };
    })
    .catch(err => {
      console.error('Error in getUserInstance:', err.message);
      throw { status: 'error', message: err.message };
    });
}

function terminateUserInstance(username) {
  const user = getUserByUsername(username);
  if (!user || !user.instanceId) {
    throw { status: 'error', message: 'User not found or does not have an active instance' };
  }

  const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

  const params = {
    InstanceIds: [user.instanceId],
  };

  return ec2.terminateInstances(params).promise()
    .then(data => {
      const terminationInfo = data.TerminatingInstances[0];
      // Clear the instanceId from the user's profile after termination
      user.instanceId = null;
      return {
        instanceId: terminationInfo.InstanceId,
        currentState: terminationInfo.CurrentState.Name,
      };
    })
    .catch(err => {
      console.error('Error in terminateUserInstance:', err.message);
      throw { status: 'error', message: err.message };
    });
}

module.exports = {
  checkCredentials: checkCredentials,
  generateToken: generateToken,
  getUserByUsername: getUserByUsername,
  createAndTagEC2Instance: createAndTagEC2Instance,
  getUserInstance: getUserInstance,
  terminateUserInstance: terminateUserInstance,
  getLabContent: getLabContent
};
