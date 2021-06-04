import { Construct } from '@aws-cdk/core'
import { User, Policy, PolicyStatement } from '@aws-cdk/aws-iam'

export class TvShowsDeploymentIamUser extends Construct {
  public readonly user: User

  constructor(scope: Construct, id: string) {
    super(scope, id)

    const name = 'TvShowStackDeploymentUser'

    this.user = new User(this, name, {
      userName: name,
    })

    const apiGatewayPolicyStatement = new PolicyStatement({
      actions: ['apigateway:*'],
      resources: ['*'],
    })

    const cloudformationPolicyStatement = new PolicyStatement({
      actions: ['cloudformation:*'],
      resources: ['arn:aws:cloudformation:eu-west-2:515213366596:stack/tv-shows-lambda-stack/*'],
    })

    const iamPolicyStatement = new PolicyStatement({
      actions: ['iam:*'],
      resources: ['arn:aws:iam::515213366596:role/TvShowsLambdaStack*'],
    })

    const route53PolicyStatement = new PolicyStatement({
      actions: ['route53:ChangeResourceRecordSets'],
      resources: ['arn:aws:route53:::hostedzone/Z071345722DA6HTUYZ248'],
    })

    const lambdaPolicyStatement = new PolicyStatement({
      actions: ['lambda:*'],
      resources: [
        'arn:aws:lambda:eu-west-2:515213366596:function:get-lambda',
        'arn:aws:lambda:eu-west-2:515213366596:function:email-lambda',
      ],
    })

    const dynamoPolicyStatement = new PolicyStatement({
      actions: ['dynamodb:*'],
      resources: ['arn:aws:dynamodb:eu-west-2:515213366596:table/TVShowsTable'],
    })

    const eventsPolicyStatement = new PolicyStatement({
      actions: ['events:*'],
      resources: ['arn:aws:events:eu-west-2:515213366596:rule/TvShowsLambdaStack-*'],
    })

    const policy = new Policy(this, `${name}Policy`, {
      statements: [
        apiGatewayPolicyStatement,
        cloudformationPolicyStatement,
        iamPolicyStatement,
        route53PolicyStatement,
        lambdaPolicyStatement,
        dynamoPolicyStatement,
        eventsPolicyStatement,
      ],
    })

    policy.attachToUser(this.user)
  }
}
