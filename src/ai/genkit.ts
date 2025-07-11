import {genkit, type Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins: Plugin<any>[] = [];

if (process.env.GCLOUD_PROJECT) {
  plugins.push(
    googleAI({
      location: process.env.GCLOUD_LOCATION,
      project: process.env.GCLOUD_PROJECT,
    })
  );
} else {
  console.warn(
    `
[Genkit] GCLOUD_PROJECT environment variable not set.
Vertex AI features will be disabled.

To enable, create a .env.local file in the root of your project and add:
GCLOUD_PROJECT="your-gcloud-project-id"
GCLOUD_LOCATION="your-gcloud-location"

Then, authenticate with 'gcloud auth application-default login'.
`
  );
}

export const ai = genkit({
  plugins,
});
