# User Management Guide

## Overview
This system uses a secure authentication system where only authorized users can access the TRECC 3D Configurator. User credentials are managed through a configuration file.

## Managing Users

### Adding New Users
1. Open `src/config/users.ts`
2. Add a new user object to the `AUTHORIZED_USERS` array:

```typescript
{
  username: 'newuser',
  password: 'securepassword',
  userData: {
    username: 'Full Name',
    rank: 'Rank',
    clearance: 'CLEARANCE_LEVEL'
  }
}
```

### Removing Users
1. Open `src/config/users.ts`
2. Remove the user object from the `AUTHORIZED_USERS` array
3. Save the file and deploy

### Modifying User Credentials
1. Open `src/config/users.ts`
2. Update the username, password, or user data as needed
3. Save the file and deploy

## Current Authorized Users

| Username | Password | Full Name | Rank | Clearance |
|----------|----------|-----------|------|-----------|
| commander | access123 | Commander Smith | Lieutenant Colonel | TOP SECRET |
| tech | tech456 | Tech Specialist Johnson | Sergeant First Class | SECRET |

## Security Features

- **Login Attempt Limiting**: After 3 failed attempts, the login form is temporarily disabled
- **Case-Insensitive Usernames**: Usernames are not case-sensitive for user convenience
- **Secure Password Matching**: Passwords are case-sensitive and must match exactly
- **No Password Storage**: Passwords are not stored in browser storage or cookies

## Deployment

After making changes to user credentials:
1. Save the `src/config/users.ts` file
2. Commit changes: `git add . && git commit -m "Updated user credentials"`
3. Push to GitHub: `git push`
4. Changes will automatically deploy to the live site

## Best Practices

- Use strong, unique passwords for each user
- Regularly update passwords
- Remove users who no longer need access
- Keep the user list minimal for security
- Use descriptive usernames that match the user's role

## Example: Adding a New Operator

```typescript
{
  username: 'operator1',
  password: 'secure789',
  userData: {
    username: 'Operator One',
    rank: 'Staff Sergeant',
    clearance: 'SECRET'
  }
}
```

## Need Help?

If you need to add, remove, or modify users, simply edit the `src/config/users.ts` file and the changes will be automatically deployed to the live site.
