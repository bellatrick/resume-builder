const DEFAULT_PARAMS = {
    model: "text-davinci-002",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  export async function getData(params = "") {
    const params_ = { ...DEFAULT_PARAMS, prompt: params };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(process.env.REACT_APP_GPT_KEY),
      },
      body: JSON.stringify(params_),
    };
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    return data.choices[0].text;
  }