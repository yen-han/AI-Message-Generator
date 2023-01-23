# AI Message Generator

AI Message Generator application using [Open AI](https://openai.com/api/). It generates and manages the thank-you email on the customized topic.

## Key Features

- Interaction with REST API  
  The message is requested with Open AI API. API is re-fetched whenever the 'Generate' button is clicked. The results are presented in a table format.
- Create, Read, and Delete operations MongoDB Database.
  Being connected with MongoDB, messages can be maintained with create, read, and delete operations from the database.
- Responsive design for desktop, tablet, and mobile.
- Pagination for the list of saved messages.
- Style with external UI kit (Chakra UI)

## How it works

Generate Messages page

1. Enter the topic and the number of messages for the thank-you email. 
2. Hit the "Generate" button.
3. After the loading is completed, the messages will be shown on the table below the button.
4. If the result is satisfied, the message can be saved by marking the check box.

Saved Messages page

1. Saved messages are shown in a table format from the most recent to the oldest.
2. By clicking the trash bin icon, the messages can be deleted.

## Built With

- NextJS
- React
- JavaScript
- MongoDB
- REST API
- Chakra UI
- SCSS

## Getting Started

1. Clone the repo

```bash
git clone https://github.com/yen-han/AI-Message-Generator.git
```

2. Install NPM packages

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Improvement

- [ ] Layout
- [ ] Different ways of API Call
