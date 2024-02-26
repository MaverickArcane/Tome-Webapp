// dataRepository.js

const users = [
  { username: 'user1', password: 'password1', instanceId: null },
  { username: 'user2', password: 'password2', instanceId: null },
  { username: 'user3', password: 'password3', instanceId: null },
  { username: 'user4', password: 'password4', instanceId: null },
  { username: 'user5', password: 'password5', instanceId: null },
  { username: 'user6', password: 'password6', instanceId: null },
  { username: 'user7', password: 'password7', instanceId: null },
  { username: 'user8', password: 'password8', instanceId: null },
  { username: 'user9', password: 'password9', instanceId: null },
  { username: 'user10', password: 'password10', instanceId: null },
  { username: 'user11', password: 'password11', instanceId: null },
  { username: 'user12', password: 'password12', instanceId: null },
  { username: 'user13', password: 'password13', instanceId: null },
  { username: 'user14', password: 'password14', instanceId: null },
  { username: 'user15', password: 'password15', instanceId: null },
  { username: 'user16', password: 'password16', instanceId: null },
  { username: 'user17', password: 'password17', instanceId: null },
  { username: 'user18', password: 'password18', instanceId: null },
  { username: 'user19', password: 'password19', instanceId: null },
  { username: 'user20', password: 'password20', instanceId: null },
  { username: 'user21', password: 'password21', instanceId: null },
  { username: 'user22', password: 'password22', instanceId: null },
  { username: 'user23', password: 'password23', instanceId: null },
  { username: 'user24', password: 'password24', instanceId: null },
  { username: 'user25', password: 'password25', instanceId: null },
  { username: 'user26', password: 'password26', instanceId: null },
  { username: 'user27', password: 'password27', instanceId: null },
  { username: 'user28', password: 'password28', instanceId: null },
  { username: 'user29', password: 'password29', instanceId: null },
  { username: 'user30', password: 'password30', instanceId: null }
];



const labs = {
  linuxLearningLab: {
    id: 'linuxLearningLab',
    title: 'Linux Learning Lab',
    content: `
      <h1>Introduction to Linux</h1>
      <p>Linux is an operating system like Windows or MacOS, only difference is Linux is open source; meaning the source code is available to anyone to inspect, modify, or enhance. A key feature of using Linux is its command-line interface(CLI) allowing users to interact directly with the system. Of course, there is a graphical user interface(GUI) which is like other operating systems.</p>

      <p>The CLI is also known as shell, terminal, console, and command prompts, or better yet could automatically execute commands which are programmed in <em>shell scripts</em>. Users execute commands by manually typing inside the terminal using shell syntax.</p>
      
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h2>Linux CLI Syntax</h2>
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul>
                <li>Commands can be run by themselves or can be run with arguments or switches to alter or add on additional behavior. It should be noted that commands are case sensitive.</li>
                <code>command [-argument] [--long-argument] file</code>
                <li>All commands including the CLI itself has a support menu/argument.</li>
                <code>command [--help]</code>
                <code>command [-help]</code>
                <code>command [-h]</code>
                <code>help</code>
                <li>Some commands will also contain a 'man' page or manual which is a deeper, more sophisticated list of instructions.</li>
                <code>man command</code>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <h2>Basic Linux Commands</h2>
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <h3>ls</h3>
                <p>The <em>ls</em> command is used to list any files and directories in the current working directory or to a specified location. This is one of the most frequently used commands used in Linux.</p>
                <code>ls [--argument] {path}</code>
                <p>For any commands used, keep in mind the <em>help</em> or <em>man</em> menu in case you get stuck or get curious to see how much more functionality even basic commands have. Explore and play around with some of the switches for <em>ls</em>.</p>
                <code>ls --help</code>
      
              <h3>id</h3>
                <p>The <em>id</em> command is used to confirm the identity of a specified Linux user. This includes any of the groups that the user belongs to, user ids(UID), and group ids(GID).</p>
                <code>id</code>
                <code>id --help</code>
                <p>It can be important to check what groups your Linux user is apart of, telling the user what permissions they have and essentially what they will have access to.</p>
      
              <h3>cd</h3>
                <p>The <em>cd</em> command allows Linux users to move around the system/directories via the CLI without having to open any kind of file manager.</p>
                <code>cd {directory path}</code>
      
              <h3>pwd</h3>
                <p>The <em>pwd</em> or <em>print working directory</em> lets the Linux user know what their current working directory is. If you are manually changing directories with <em>cd</em> it can sometimes be a bit confusing especially if you are working with a terminal that doesn't explicitly tell you your location.</p>
                <code>pwd</code>
      
              <h3>cat</h3>
                <p>The <em>cat</em> command is used for when the contents of a file need to be printed to the terminal output. In other words, it reads the file and prints the contents directly to the terminal without having to open the file itself.</p>
                <code>cat <file name></code>
                <p><em>cat</em> is not the only command to have this functionality, try using the Linux CLI help menu to find similar commands.</p>
      
              <h3>grep</h3>
                <p>The <em>grep</em> command allows users to search for a specific string within the given output. As you've probably noticed when <em>cat</em>ting a file the terminal can quickly become full and demand more time for analysis. <em>grep</em> will take a user argument and search the entire specified file for that keyword, almost like <em>CTRL+F</em>.</p>
                <code>grep [keyword] file</code>
      
              <h3>python</h3>
                <p>Python is a very common programming language and is arguably the most popular. As a developer, CTF going, software engineering, or penetration tester you will undoubtedly use python.</p>
                <p>To run a python script the user will first need to have a script to run. These will notably have the <em>.py</em> extension to signal it's a python script.</p>
                <code>python3 <scriptName></code>
                <p>Or run other versions of python by changing the number. Try to run an older version of python on the script provided.</p>
                <code>python <scriptName></code>
                <code>python2.7 <scriptName></code>
                <code>python2 <scriptName></code>
                <p>In some instances the <em>.py</em> is not needed depending on the type of script. Linux will automatically know it's python if the developer uses a special header known as a <strong>shebang line</strong>. Allowing for ease of portability.</p>
                <code>#!/usr/bin/env python3</code>
                <code>#!/usr/bin/python3</code>
      
              <h3>find</h3>
                <p>The <em>find</em> command is a built-in utility for finding files throughout the entire system. It can be used to find anything from files, directories, and even perform actions if desired.</p>
                <p><em>find</em> supports a very large variety of switches and arguments so take some time to go through the <strong>man</strong> page.</p>
                <code>man find</code>
                <code>find --help</code>
                <p>Users can search by specific files, folders, names, creation dates, modification dates, user owner, user groups, and much more. Generally, the find command will follow a syntax for use.</p>
                <code>find [where to start looking] [-arguments]</code>
                <p>It might look a little something like this</p>
                <code>find / -name 'someFile.txt'</code>
                <p>The <strong>/</strong> tells <em>find</em> to start at the very start of the system file hierarchy. If it was Windows it would be C:\ For the example, we wanted to find the exact file name of <em>someFile.txt</em> if it exists it will print the full working directory. If it doesn't then no output will be displayed. Try running the command above in your terminal.</p>
                <p>If you ran the command above then surely you've noticed the large amount of error responses. This is because as a standard user we do not have access to all the files and directories on the system. This could make finding the non-error output challenging.</p>
                <p>In order to fix this we will be adding an additional argument to our <em>find</em> command</p>
                <code>2>/dev/null</code>
                <p><strong>2></strong> takes any standard error output and sends that output to <em>/dev/null</em> which is something I like to call <em>The Void</em> The Void is an abyss of nothingness, sending output here is like sending it to nowhere, it doesn't get saved, logged, or anything. It's forgotten to the void.</p>
                <p>Our new command with added syntax should look as follows. Try running this command now.</p>
                <code>find / -name 'someFile.txt' 2>/dev/null</code>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <h2>Challenge Questions</h2>
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ol>
                <li>In your home directory, what is the flag of the file?</li>
                <li>Change directories to <em>level1</em>, what is the flag?</li>
                <li>Change directories to <em>level2</em>, what is the content of the file?</li>
                <li>What unique group ID does your user belong to?</li>
                <li>Change directories to <em>level3</em> and continue till you run out of directories, what is the <strong>full</strong> current working directory?</li>
                <li>Change directories to <em>level4</em>, find the flag next to the string <em>arcane</em>.</li>
                <li>Change directories to <em>level5</em> and run the python script. What's the flag?</li>
                <li>Find the <em>hidden</em> flag <em>somewhere on the server</em> that belongs to your user's <em>unique</em> group ID.</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              <h2>Congratulations on completing this Linux learning lab.</h2>
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <p>Take some additional time to go through more of the commands and their man/help pages and explore all the possibilities of ways to use them. This was not even scratching the surface.</p>
            </div>
          </div>
        </div>
      </div>    
    `,
  },
  networkingLab: {
    id: 'networkingLab',
    title: 'Networking Lab',
    content: `
    <h1>Get Ready for the Networking Lab!</h1>

    <p>Welcome to MageMesh, an immersive networking lab designed for intermediate cyber professionals. To streamline your experience, you can now spawn your Kali Lab instance with all the necessary files loaded onto the desktop. Follow the steps below:</p>

    <ol>
      <li>Click the <strong>Blue Spawn Kali</strong> button at the top right of the screen.</li>
      <li>Wait patiently for approximately two minutes as your Kali instance is set up.</li>
      <li>Your Kali Lab will automatically open in a new tab with all the lab files conveniently placed on the desktop.</li>
    </ol>

    <p>This streamlined process ensures that you have a dedicated environment ready for the networking challenges ahead. Dive into the world of networking and security with confidence!</p>

    <hr>
    
    <h1>MageMesh: Networking Lab</h1>

    <p>Welcome to MageMesh, an immersive networking lab designed for intermediate cyber professionals. In this lab, we will delve into the fascinating world of networking and security challenges using Docker, Nmap, Wireshark, Nikto, and more. Get ready to enhance your skills and knowledge!</p>

    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h3>Challenge 1: Sniffing Network Traffic</h3>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p>Docker has created two networks on your machine, and one of them operates on the <strong>10.10.73.0/24</strong> range. Your first task is to sniff this network using a network traffic analyzer. This will help you uncover vulnerabilities and answer the following questions:</p>

            <ol>
              <li><strong>Insecure Protocol:</strong> Identify the insecure protocol used that reveals sensitive information about the network infrastructure on the subnet.</li>
              <li><strong>Source IP:</strong> Determine the source IP address that initiated the insecure connection.</li>
              <li><strong>Destination IP:</strong> Find the destination IP address accepting this insecure protocol.</li>
            </ol>
      
            <p><strong>Understanding Network Sniffing:</strong></p>
            <p>Network sniffing involves capturing and analyzing data packets as they travel across a network. It's a crucial skill for cybersecurity professionals to detect vulnerabilities and potential threats.</p>
      
            <p><strong>Insecure Protocols:</strong></p>
            <p>Protocols like Telnet, HTTP, and FTP are often considered insecure as they transmit data in plaintext. Sniffing such protocols can reveal sensitive information.</p>
      
            <p><strong>Wireshark:</strong></p>
            <p>Wireshark is a powerful network protocol analyzer. Use it to capture and inspect packets on the <strong>10.10.73.0/24</strong> network. Identify the insecure protocol and understand the flow of data between source and destination IPs.</p>
      
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h3>Challenge 2: Nmap Scan</h3>
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p>Nmap is a versatile tool for network exploration and security auditing. Conducting a scan on the <strong>192.168.45.0/24</strong> range provides valuable insights:</p>

            <ol start="4">
              <li><strong>Number of Responding Hosts:</strong> Discover the number of hosts responding to your Nmap scan. This is essential for mapping the network.</li>
              <li><strong>Open Ports:</strong> Identify open ports on the host <strong>192.168.45.100</strong>. Open ports indicate services running on the machine.</li>
              <li><strong>Tomcat Vulnerability:</strong> Investigate the Tomcat-related vulnerability on <strong>192.168.45.100</strong>. Understand CVEs (Common Vulnerabilities and Exposures) to assess the severity of vulnerabilities.</li>
            </ol>
      
            <p><strong>Understanding Nmap:</strong></p>
            <p>Nmap allows you to discover hosts, services, and vulnerabilities on a network. It uses various scan techniques, including TCP SYN, to gather information about open ports and services.</p>
      
            <p><strong>Port Scanning:</strong></p>
            <p>Ports act as endpoints for communication. An open port indicates a running service. Analyze the open ports on <strong>192.168.45.100</strong> to understand potential attack vectors.</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h3>Challenge 3: Service Identification</h3>
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <p>Identifying services on <strong>192.168.45.100</strong> and <strong>10.10.73.150</strong> is crucial for assessing their security implications:</p>

          <p><strong>Identifying Services:</strong></p>
          <p>Services running on machines provide functionalities. Use tools like Nmap or manual inspection to determine services on IPs <strong>192.168.45.100</strong> and <strong>10.10.73.150</strong>.</p>
      
          <p><strong>Common Services:</strong></p>
          <p>Common services include HTTP (web servers), SSH (secure shell), and FTP (file transfer protocol). Understanding services aids in evaluating potential vulnerabilities.</p>
        </div>
      </div>
    </div>`,
  }
};

function getUsers() {
  return users;
}

function getLabs() {
  return labs;
}

module.exports = {
  getUsers: getUsers,
  getLabs: getLabs
};
