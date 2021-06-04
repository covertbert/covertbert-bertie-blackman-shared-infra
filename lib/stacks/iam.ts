import { Stack, App, StackProps } from '@aws-cdk/core'

import { DeploymentGroup } from '../constructs/iam/groups/deployment'

import { AdminIamUser } from '../constructs/iam/users/admin'
import { TvShowsDeploymentIamUser } from '../constructs/iam/users/tv-shows'
import { SharedInfraDeploymentIamUser } from '../constructs/iam/users/shared-infra'

export class IAMStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const deploymentGroup = new DeploymentGroup(this, 'DeploymentGroupDeployment')

    new AdminIamUser(this, 'AdminStackDeployment')

    const tvShowsDeploymentUser = new TvShowsDeploymentIamUser(this, 'TvShowStackDeployment')
    const sharedInfraDeploymentUser = new SharedInfraDeploymentIamUser(
      this,
      'SharedInfraStackDeployment',
    )

    deploymentGroup.group.addUser(tvShowsDeploymentUser.user)
    deploymentGroup.group.addUser(sharedInfraDeploymentUser.user)
  }
}
