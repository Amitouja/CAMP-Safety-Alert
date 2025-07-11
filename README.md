# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

## GenAI with Vertex AI

This application uses [Genkit](https://firebase.google.com/docs/genkit) with [Vertex AI](https://cloud.google.com/vertex-ai) to provide generative AI capabilities.

To enable the AI features, you will need to set up your environment variables. First, create a `.env.local` file in the root of your project by copying the example `.env` file:

```bash
cp .env .env.local
```

Then, fill in the following values in your new `.env.local` file:

### `GCLOUD_PROJECT`

*   **What it is:** The unique identifier for your Google Cloud project.
*   **How to get it:** Go to the [Google Cloud Console](https://console.cloud.google.com/). Your Project ID is on the main dashboard in the "Project info" card.

### `GCLOUD_LOCATION`

*   **What it is:** The geographic region for your Vertex AI resources (e.g., `us-central1`).
*   **How to get it:** You can use `us-central1` as a default. For other options, see the [official list of Vertex AI locations](https://cloud.google.com/vertex-ai/docs/general/locations).

After setting these variables, you need to:

1.  **Enable the Vertex AI API** in your Google Cloud project.
2.  **Set up authentication:** For local development, you can use the gcloud CLI. Run `gcloud auth application-default login` in your terminal to authenticate.

## Google Maps

The map feature on the `/map` page uses the Google Maps API. To enable it, you need to add the following to your `.env.local` file:

### `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

*   **What it is:** The API key that allows your app to display Google Maps.
*   **How to get it:**
    1.  In the Google Cloud Console, go to "APIs & Services" > "Credentials".
    2.  Click **+ CREATE CREDENTIALS** and select **API key**.
    3.  **Important:** Remember to restrict your API key to your website's domain for security purposes.
    4.  Enable the **Maps JavaScript API** for your project.
