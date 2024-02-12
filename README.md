# Validate Oso Cloud Policy syntax

GitHub Action that uses the Oso Cloud CLI
to ensure that all [polar](https://www.osohq.com/docs/tutorials/quickstart)
code in the current repository is syntactically valid.

Currently searches for all `.polar` files that are not symlinks,
in order to prevent errors caused by duplicating syntax.

All `.polar` files that compose the policy must be evaluated together,
because rules in one polar file may refer to entities that are
defined in another.

The Oso Cloud CLI should be installed on the runner before using this action.
Use the setup-oso-cloud action to do this.

- __Inputs:__ none
- __Outputs:__ none

Succeeds if the `oso-cloud validate` command succeeds, fails otherwise.
