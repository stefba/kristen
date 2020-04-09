

# Hooker

Hooker controls Gatsby builds via webhooks. It takes requests on `/rl/` to run a build. If a build is already underway, a second one is queued. Additional requests are dropped until the queue empties.
