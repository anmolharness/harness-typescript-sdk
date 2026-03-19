/**
 * Integration Test Example
 *
 * This file demonstrates how to test the SDK against a real Harness account.
 *
 * Setup:
 * 1. Set environment variables:
 *    export HARNESS_API_KEY="your-api-key"
 *    export HARNESS_ACCOUNT_ID="your-account-id"
 *
 * 2. Run with tsx:
 *    npx tsx examples/integration-test.ts
 */

import { HarnessSDK } from '../src/index.js';

async function runIntegrationTests() {
  // Initialize SDK
  const harness = new HarnessSDK({
    apiKey: process.env.HARNESS_API_KEY!,
    accountId: process.env.HARNESS_ACCOUNT_ID!,
  });

  console.log('🚀 Starting Harness SDK Integration Tests\n');

  try {
    // Test 1: List Organizations
    console.log('1. Testing Organizations API...');
    const orgs = await harness.organizations.list();
    console.log(`   ✅ Found ${orgs.content?.length || 0} organizations`);

    // Test 2: List Projects
    if (orgs.content && orgs.content.length > 0) {
      const firstOrg = orgs.content[0];
      console.log(`\n2. Testing Projects API (org: ${firstOrg.identifier})...`);
      const projects = await harness.projects.list(firstOrg.identifier);
      console.log(`   ✅ Found ${projects.content?.length || 0} projects`);

      // Test 3: List Services (if projects exist)
      if (projects.content && projects.content.length > 0) {
        const firstProject = projects.content[0];
        console.log(`\n3. Testing Services API (project: ${firstProject.identifier})...`);
        const services = await harness.services.list(firstOrg.identifier, firstProject.identifier);
        console.log(`   ✅ Found ${services.content?.length || 0} services`);
      }
    }

    // Test 4: List Connectors (account level)
    console.log('\n4. Testing Connectors API...');
    const connectors = await harness.connectors.list();
    console.log(`   ✅ Found ${connectors.content?.length || 0} connectors`);

    // Test 5: List Users
    console.log('\n5. Testing Users API...');
    const users = await harness.users.list();
    console.log(`   ✅ Found ${users.content?.length || 0} users`);

    // Test 6: List Delegates
    console.log('\n6. Testing Delegates API...');
    const delegates = await harness.delegates.list();
    console.log(`   ✅ Found ${delegates.content?.length || 0} delegates`);

    console.log('\n✅ All integration tests passed!');
  } catch (error) {
    console.error('\n❌ Integration test failed:', error);
    if (error instanceof Error) {
      try {
        const harnessError = JSON.parse(error.message);
        console.error(`   Code: ${harnessError.code}`);
        console.error(`   Message: ${harnessError.message}`);
        console.error(`   Status: ${harnessError.status}`);
      } catch {
        console.error(`   Error: ${error.message}`);
      }
    }
    process.exit(1);
  }
}

// Check for required environment variables
if (!process.env.HARNESS_API_KEY || !process.env.HARNESS_ACCOUNT_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   HARNESS_API_KEY');
  console.error('   HARNESS_ACCOUNT_ID');
  console.error('\nPlease set these environment variables and try again.');
  process.exit(1);
}

// Run tests
runIntegrationTests();
