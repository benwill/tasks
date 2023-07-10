# Running the code

```
benwilliams@Bens-MBP tasks % node --version
v18.16.1
```

`npm install`
`npm start`

This will run a hard-coded example.

Expect to see the following output;

```
benwilliams@Bens-MBP tasks % npm start

> tasks@1.0.0 start
> ts-node index.ts

23:05:01: TASK: task 1 start.
23:05:02: TASK: task 1 end.
23:05:02: TASK: task 2 start.
23:05:05: TASK: task 2 end.
23:05:05: TASK: task 3 start.
23:05:07: TASK: task 3 end.
23:05:07: TASK: task 4 start.
23:05:08: TASK: task 4 end.
```

# Running the tests

`npm test` - just using jest

# With more time

- I'd look at handling 'failed tasks' better & adding unit tests for these
- Better 'framework' logging, possibly using an object to store the tasks rather than an array so you can track extra data e.g. the name
  - if we did this we can then log whenever tasks start and end (along with their name / metadata) much more easily without adding that logic into the tasks themselves
- maybe a UI to allow us to add tasks via buttons etc.
