# KoinX - Tax Loss Harvesting

Simple and clean React implementation of the KoinX Tax Loss Harvesting assignment.

## Live Features

- Mock API integration for holdings and capital gains
- Pre-harvesting card from capital gains API data
- After-harvesting card updates in real time based on selected holdings
- Table row checkbox selection + select all checkbox
- Amount to sell shown only for selected rows
- Savings line shown only when post-harvesting realised gains are lower
- Mobile responsive layout
- Loading and error states for API calls
- View all / show less in holdings table

## Tech Stack

- React (Vite)
- Plain CSS (component-wise CSS files)
- Local mock APIs with Promise delay

## Folder Structure

```text
src/
	api/
		mockData.js
		taxHarvestApi.js
	components/
		headerBar/
			headerBar.jsx
			headerBar.css
		notesDisclaimer/
			notesDisclaimer.jsx
			notesDisclaimer.css
		preHarvest/
			preHarvest.jsx
			preHarvest.css
		postHarvest/
			postHarvest.jsx
			postHarvest.css
		holdingsTable/
			holdingsTable.jsx
			holdingsTable.css
	pages/
		taxHarvest/
			taxHarvest.jsx
			taxHarvest.css
	utils/
		calculations.js
		formatters.js
	App.jsx
	App.css
	index.css
	main.jsx
```

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Business Logic Summary

- Pre-harvesting values come directly from capital gains API.
- Net capital gains = profits - losses
- Realised capital gains = net short-term + net long-term
- On row select:
	- If holding gain > 0, add to profits
	- If holding gain < 0, add abs(gain) to losses
- Savings is shown only when:
	- pre-harvesting realised gains > post-harvesting realised gains

## Assumptions

- Loss fields in API are positive numbers and displayed with minus sign in UI.
- Duplicate coin symbols can exist, so each row gets a unique internal id using index.
- Mock API delay is intentionally added for loader visibility.

## Screenshots

- Add desktop and mobile screenshots after running locally.

## Deploy

Can be deployed easily on Vercel or Netlify.
