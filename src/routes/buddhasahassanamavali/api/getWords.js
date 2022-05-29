import { GraphQLClient } from 'graphql-request';

export const getWords = async () => { 
  const graphcmsClient = new GraphQLClient(
    `${import.meta.env.VITE_GRAPHCMS_ENDPOINT}`,
    { headers: {} }
  );

  try {
    const { vocabularyWords } = await graphcmsClient.request(
      `query VocabularyWord {
        vocabularyWords {
          wordId
          word
          definition
          etymology
        }
      }`
    );
    console.log(vocabularyWords)
    return vocabularyWords;
  } catch(error) {
    return {
      status: 500,
      body: {
        error: 'A Server Error Occurred!',
      }
    }
  }
}