/**
 * Basic usage examples for Harness TypeScript SDK
 */

import { HarnessSDK } from '../src/index.js';

async function main() {
  // Initialize SDK
  const harness = new HarnessSDK({
    apiKey: process.env.HARNESS_API_KEY || 'your-api-key',
    accountId: process.env.HARNESS_ACCOUNT_ID || 'your-account-id',
  });

  try {
    // List organizations
    console.log('📋 Listing organizations...');
    const orgsPage = await harness.organizations.list({ limit: 5 });
    console.log(`Found ${orgsPage.totalItems} organizations`);
    orgsPage.content.forEach(org => {
      console.log(`  - ${org.name} (${org.identifier})`);
    });

    // Get first org
    if (orgsPage.content.length > 0) {
      const firstOrg = orgsPage.content[0];
      console.log(`\n📂 Getting organization: ${firstOrg.identifier}`);
      const org = await harness.organizations.get(firstOrg.identifier);
      console.log(`  Name: ${org.name}`);
      console.log(`  Created: ${org.createdAt ? new Date(org.createdAt) : 'N/A'}`);

      // List projects in this org
      console.log(`\n📋 Listing projects in ${firstOrg.identifier}...`);
      const projectsPage = await harness.projects.list(firstOrg.identifier, { limit: 5 });
      console.log(`Found ${projectsPage.totalItems} projects`);
      projectsPage.content.forEach(project => {
        console.log(`  - ${project.name} (${project.identifier})`);
      });

      // Get first project
      if (projectsPage.content.length > 0) {
        const firstProject = projectsPage.content[0];

        // List services
        console.log(`\n📋 Listing services in ${firstOrg.identifier}/${firstProject.identifier}...`);
        const servicesPage = await harness.services.list(firstOrg.identifier, firstProject.identifier, { limit: 5 });
        console.log(`Found ${servicesPage.totalItems} services`);
        servicesPage.content.forEach(service => {
          console.log(`  - ${service.name} (${service.identifier})`);
        });

        // List environments
        console.log(`\n📋 Listing environments in ${firstOrg.identifier}/${firstProject.identifier}...`);
        const envsPage = await harness.environments.list(firstOrg.identifier, firstProject.identifier, { limit: 5 });
        console.log(`Found ${envsPage.totalItems} environments`);
        envsPage.content.forEach(env => {
          console.log(`  - ${env.name} (${env.identifier}) - ${env.type}`);
        });

        // List pipelines
        console.log(`\n📋 Listing pipelines in ${firstOrg.identifier}/${firstProject.identifier}...`);
        const pipelinesPage = await harness.pipelines.list(firstOrg.identifier, firstProject.identifier, { limit: 5 });
        console.log(`Found ${pipelinesPage.totalItems} pipelines`);
        pipelinesPage.content.forEach(pipeline => {
          console.log(`  - ${pipeline.name} (${pipeline.identifier})`);
        });
      }
    }

    // List account-level connectors
    console.log('\n📋 Listing account-level connectors...');
    const connectorsPage = await harness.connectors.list(undefined, undefined, { limit: 5 });
    console.log(`Found ${connectorsPage.totalItems} connectors`);
    connectorsPage.content.forEach(connector => {
      console.log(`  - ${connector.name} (${connector.type})`);
    });

    console.log('\n✅ Success!');
  } catch (error) {
    console.error('❌ Error:', error);
    try {
      const harnessError = JSON.parse(error.message);
      console.error('Code:', harnessError.code);
      console.error('Message:', harnessError.message);
      console.error('Status:', harnessError.status);
    } catch {
      // Not a Harness error
    }
    process.exit(1);
  }
}

main();
