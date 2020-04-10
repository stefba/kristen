

# Make

Make initiates Gatsby builds via a webhook interface. It takes requests on `/rl/` to run a build. If one is already underway, a second one is queued. Additional requests are dropped until the queue empties.
