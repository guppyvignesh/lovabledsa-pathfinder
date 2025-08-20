// leetcode videos
import axios from "axios";
import fs from "fs";

async function fetchAllProblems() {
  const problems = [];
  let skip = 0;
  const limit = 50;
  let total = Infinity;

  const query = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        questionId
        questionFrontendId
        title
        titleSlug
        content
        difficulty
        isPaidOnly
        status
        exampleTestcases
        categoryTitle
        topicTags {
          name
          slug
        }
        stats
        codeSnippets {
          lang
          langSlug
          code
        }
        hints
        solution {
          id
          canSeeDetail
        }
        metaData
        enableRunCode
        envInfo
        similarQuestions
        mysqlSchemas
        sampleTestCase
        translatedContent  # <-- changed here, no subfields
      }
    }
  }
`;

  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    Referer: "https://leetcode.com/problemset/all/",
  };

  while (skip < total) {
    try {
      const variables = { categorySlug: "", limit, skip, filters: {} };
      const response = await axios.post(
        "https://leetcode.com/graphql",
        { query, variables },
        { headers }
      );

      if (response.data.errors) {
        console.error("GraphQL errors:", response.data.errors);
        break;
      }

      const data = response.data.data.problemsetQuestionList;
      if (!data) {
        console.error("No data found in response:", response.data);
        break;
      }

      total = data.total;
      problems.push(...data.questions);
      skip += limit;

      console.log(`Fetched ${Math.min(skip, total)} / ${total} problems`);
    } catch (error) {
      console.error(
        "Error fetching problems:",
        error.response?.data || error.message
      );
      break;
    }
  }

  fs.writeFileSync(
    "leetcode_all_problems.json",
    JSON.stringify(problems, null, 2)
  );
  console.log("All problems saved to leetcode_all_problems.json");
}

fetchAllProblems();
