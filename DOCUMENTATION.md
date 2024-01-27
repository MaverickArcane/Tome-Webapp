# Tome API Documentation

## Health

**Endpoint:** `GET /api/v1/health`

**Description:** Authenticate a user and receive an access token.

**Responses:**

- **200 OK:**
```json
{
  "uptime": "<uptime>",
  "message": "Ok",
  "date ": "<system date>"
}
```


## Sign In

**Endpoint:** `POST /api/v1/signin`

**Description:** Authenticate a user and receive an access token.

**Request:**
```json
{
  "username": "<your_username>",
  "password": "<your_password>"
}
```

**Responses:**

- **200 OK:**
```json
{
  "status": "success",
  "message": "Signed in successfully",
  "token": "<your_access_token>"
}
```

- **401 Unauthorized:**
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```
## Sign Out

**Endpoint:** `GET /api/v1/signout`

**Description:** Sign out the authenticated user.

**Request Header:**
```
Cookie: token=<your_access_token>
```
**Responses:**

- **200 OK:**
```json
{
  "status": "success",
  "message": "Signed out successfully",
  "terminatedInstanceId": "<terminated_instance_id>"
}
```

- **401 Unauthorized:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```
## Lab Content
**Endpoint:** `GET /api/v1/lab/:labId`

**Description:** Retrieve content for a specific learning lab.

**Request Header:**

```json
Cookie: token=<your_access_token>
```
**Responses:**

- **200 OK:**
```json
{
  "status": "success",
  "message": "Lab content retrieved successfully",
  "labContent": {
    "labId": "<lab_id>",
    "title": "<lab_title>",
    "content": "<lab_content>"
  }
}

```
- **404 Not Found:**
```json
{
  "status": "error",
  "message": "Lab not found"
}

```

- **403 Forbidden:**
```json
{
  "status": "error",
  "message": "User already has an active instance"
}
```

## Spawn Kali Instance

**Endpoint:** `GET /api/v1/kalispawn`

**Description:** Spawn a Kali Linux instance for the authenticated user.

**Request Header:**

```json
Cookie: token=<your_access_token>
```

**Responses:**

- **200 OK:**
```json
{
  "status": "success",
  "message": "Instance created and tagged successfully",
  "link": "<your_instance_link>"
}
```
- **400 Bad Request:**
```json
{
  "status": "error",
  "message": "Bad Request"
}
```

- **403 Forbidden:**
```json
{
  "status": "error",
  "message": "User already has an active instance"
}
```


## Kill Kali Instance

**Endpoint:** `GET /api/v1/killinstance`

**Description:** Kill a Kali Linux instance for the authenticated user.

**Request Header:**

```json
Cookie: token=<your_access_token>
```

**Responses:**

- **200 OK:**
```json
{
  "status": "success",
  "message": "Instance terminated successfully",
  "terminatedInstanceId": "<your_instance_id>"
}
```

- **200 OK:**
```json
{
  "status": "Error",
  "message": "No User Instance",
  "terminatedInstanceId": "Null"
}
```

- **400 Bad Request:**
```json
{
  "status": "error",
  "message": "Bad Request"
}
```

- **403 Forbidden:**
```json
{
  "status": "error",
  "message": "User already has an active instance"
}
```
