

# Hooker

Hooker takes requests on `/rl/` to run Gatsby builds. If a build is already underway, a second one is queued. Additional requests are dropped until the queue empties.
