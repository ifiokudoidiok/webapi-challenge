- [ ] Mention two parts of Express that you learned about this week.

MiddleWare and Server Side Routing

- [ ] Describe Middleware?

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. Middlewares can execute code, make changes to the req and res object, end the response cycle and call the next middleware function.

- [ ] Describe a Resource?

A resource is our database, basically where we get our data from. we can perform create, read, update and delete methods on them using HTTP verbs such as GET, DELETE, POST and PUT

- [ ] What can the API return to help clients know if a request was successful?

It can return a response with the status code (2xx) example: 200 which means ok, or 201 which means created

- [ ] How can we partition our application into sub-applications?

The way we have access to .use() as a router or sub-router, also works on the Express application instance! That means we can create new instances of the Express object, and .use it in another Express object just like a router or other middleware. This allows us to have subapplications within our main express app.