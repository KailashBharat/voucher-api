# Actions taken to make API more secure

### Add roles ('Admin', 'User')

This action enables users with admin priviledges to access certain endpoints that a regular user can't

### Rate Limiter

A rate limiter prevents a user from making too many requests to an endpoint within a given time frame. Doing this can prevent the system's resources from being exhausted

### Helmet

Helmet helps with securing the API by setting various HTTP headers. Each header has a different purpose, which means each header protects the api from a certain attack

### Limit on GraphQL Query Depth

Large nested queries are dangerous because they're very expensive to compute. It could crash the API and take up all the available resources

### Input validation

Validating input prevents users from entering malicious data into our system.

### User validation on Dangerous Operations (Delete)

Validating user before some dangerous operation is done. This action makes sure that only the user that created the record can alter/remove it.
