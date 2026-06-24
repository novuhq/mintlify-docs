# Source: https://docs.novu.co/framework/deployment/production

# Production Deployment

Learn how to deploy your Novu Framework application to production including networking, security, and HMAC verification setup.

## [Networking](https://docs.novu.co/#networking)

Novu Cloud workers will need to be able to communicate with your [Bridge Endpoint](https://docs.novu.co/framework/endpoint). You will need to ensure that your firewall rules allow traffic from the internet. Due to the autoscaling nature of Novu Cloud, we don't have a set of IP Addresses that you can whitelist.

## [Security](https://docs.novu.co/#security)

Novu Cloud workers are GDPR, SOC2 type II and ISO 27001 compliant. We take security very seriously and have implemented a number of security measures to ensure that your data is safe. Novu Framework has a builtin security mechanism that ensures that the requests are authentic from Novu Cloud using an HMAC signature.

HMAC Verification is turned on by default for all "production" NODE\_ENV environments

For `NODE_ENV=development` the HMAC validation is turned off, for the Studio to be able to reach your endpoint.

The `Novu-Signature` header included in each signed event contains a timestamp and one or more signatures that we verify. The timestamp is prefixed by `t=`, and each signature is prefixed by a scheme. Schemes start with `v`, followed by an integer. Currently, the only valid live signature scheme is v1.

Handling the signature verification is done by the Novu Framework, so you don't need to perform any action.

[Class Validator\\ \\ Integrate Class Validator with your notification workflows](https://docs.novu.co/framework/schema/class-validator) [Syncing\\ \\ Learn how to sync your local workflow changes to the Novu Cloud Dashboard across development and production environments.](https://docs.novu.co/framework/deployment/syncing)

### On this page

[Networking](https://docs.novu.co/#networking) [Security](https://docs.novu.co/#security)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/deployment/production.mdx)Open in ChatGPTOpen in Claude