
<h1 align="center">
  <a>Atomic Widgets AI POC</a>
  <br>
</h1>
 <p align="center">A POC for generating elementor web parts using the atomic widgets with AI</p>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>


## How To Use
1. Clone elementor repo `https://github.com/elementor/elementor`
2. Checkout to the following branch: `https://github.com/Omerisra6/elementor/tree/Internal/ai-demo`.
3. Clone this repo: `https://github.com/Omerisra6/elementor-ai-demo`
4. Assign your OpenAI API key to the following env variable: `OPEN_AI_KEY`
5. In the `.wp-env.json` file add the path to the your elementor repo in the plugins array
6. Run `wp-env start` to start your wp environment
7. Run `npm run single` to run a single prompt
8. Run `npm run full` to run all prompts available
9. To look at the result, in the open your wordpress enviornment in the browser and navigate to the newly created post.



## License

MIT

---
