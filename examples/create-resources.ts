/**
 * Example: Create resources in Harness
 */

import { HarnessSDK } from '../src/index.js';

async function main() {
  const harness = new HarnessSDK({
    apiKey: process.env.HARNESS_API_KEY || 'your-api-key',
    accountId: process.env.HARNESS_ACCOUNT_ID || 'your-account-id',
  });

  try {
    // Create organization
    console.log('📁 Creating organization...');
    const org = await harness.organizations.create({
      identifier: 'demo_org',
      name: 'Demo Organization',
      description: 'Created by Harness TypeScript SDK',
    });
    console.log(`✅ Created organization: ${org.name}`);

    // Create project
    console.log('\n📁 Creating project...');
    const project = await harness.projects.create({
      identifier: 'demo_project',
      orgIdentifier: 'demo_org',
      name: 'Demo Project',
      description: 'Created by Harness TypeScript SDK',
      modules: ['CD'],
    });
    console.log(`✅ Created project: ${project.name}`);

    // Create service
    console.log('\n📁 Creating service...');
    const service = await harness.services.create({
      identifier: 'demo_service',
      orgIdentifier: 'demo_org',
      projectIdentifier: 'demo_project',
      name: 'Demo Service',
      description: 'Created by Harness TypeScript SDK',
    });
    console.log(`✅ Created service: ${service.name}`);

    // Create environment
    console.log('\n📁 Creating environment...');
    const env = await harness.environments.create({
      identifier: 'demo_env',
      orgIdentifier: 'demo_org',
      projectIdentifier: 'demo_project',
      name: 'Demo Environment',
      description: 'Created by Harness TypeScript SDK',
      type: 'PreProduction',
    });
    console.log(`✅ Created environment: ${env.name}`);

    // Create connector
    console.log('\n📁 Creating connector...');
    const connector = await harness.connectors.create({
      identifier: 'demo_docker_connector',
      orgIdentifier: 'demo_org',
      projectIdentifier: 'demo_project',
      name: 'Demo Docker Connector',
      description: 'Created by Harness TypeScript SDK',
      type: 'DockerRegistry',
      spec: {
        dockerRegistryUrl: 'https://index.docker.io/v2/',
        providerType: 'DockerHub',
        auth: {
          type: 'Anonymous',
        },
      },
    });
    console.log(`✅ Created connector: ${connector.name}`);

    console.log('\n🎉 All resources created successfully!');
    console.log('\n⚠️  Remember to clean up these demo resources when done.');

  } catch (error) {
    console.error('❌ Error:', error);
    try {
      const harnessError = JSON.parse(error.message);
      console.error('Code:', harnessError.code);
      console.error('Message:', harnessError.message);
    } catch {
      // Not a Harness error
    }
    process.exit(1);
  }
}

main();
