<template>
  <div class="design-document">
    <div class="left-content">
      <div class="folders">
        <div class="row selected">▶︎ 画面設計書</div>
        <div class="row">▶︎ 画面設計書</div>
        <div class="row">▶︎ 画面設計書</div>
        <div class="row">▶︎ 画面設計書</div>
        <div class="row">▶︎ 画面設計書</div>
      </div>
      <div class="files">
        <div class="row">- 画面設計書</div>
        <div class="row selected">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
        <div class="row">- 画面設計書</div>
      </div>
    </div>
    <div class="right-content">
      <div class="box">
        <div class="document">
          <vue-markdown
            :source="source"
            :html="false"
            :toc="true"
            :toc-first-level="1"
            :toc-anchor-link="false"
            v-highlight
          ></vue-markdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

const designDocumentApp = {
  name: "design-document",
  data: () => ({
    source: `
# 画面設計書
## UI設計書
### aaaあいう
#### aaaaあいう
##### aaaaaaあいう
###### aaaaaaaaaaあいう

* aaaa
  * aaaa
* aaaa
  * aaaa

<html></html>

---

![Minion](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2016-06-14_Orange_and_white_tabby_cat_born_in_2016_%E8%8C%B6%E3%83%88%E3%83%A9%E7%99%BD%E3%81%AD%E3%81%93_DSCF6526%E2%98%86%E5%BD%A1.jpg/200px-2016-06-14_Orange_and_white_tabby_cat_born_in_2016_%E8%8C%B6%E3%83%88%E3%83%A9%E7%99%BD%E3%81%AD%E3%81%93_DSCF6526%E2%98%86%E5%BD%A1.jpg)

> aa
> aa
> aa
>> aaa
>> aaa

\`\`\` json
{
  "aaa": "aaaaa"
}
\`\`\`

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


    `
  }),
  components: {
    VueMarkdown
  }
};

export default designDocumentApp;
</script>

<style lang="scss" scoped>
.design-document {
  height: 100%;

  .left-content {
    display: inline-block;
    width: 250px;
    height: 100%;
    padding: 10px;
    vertical-align: top;
    .folders {
      display: block;
      position: relative;
      width: calc(100% - 0px);
      padding: 10px;
      margin-bottom: 10px;
      background-color: #1abc9c;
      border-radius: 5px;
      height: calc(40% - 10px);
      color: #ffffff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
      overflow: auto;
      font-size: 12px;
    }
    .files {
      display: block;
      position: relative;
      width: calc(100% - 0px);
      padding: 10px;
      background-color: #1abc9c;
      border-radius: 5px;
      height: calc(60%);
      color: #ffffff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
      overflow: auto;
      font-size: 12px;
    }
    .row {
      padding: 3px 6px;
      margin-bottom: 2px;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.1s;
    }
    .row:hover {
      background-color: #16a085;
    }
    .selected {
      color: #16a085;
      background-color: #ffffff !important;
    }
  }
  .right-content {
    display: inline-block;
    width: calc(100% - 260px);
    height: 100%;
    padding: 10px;
    vertical-align: top;

    .box {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
      padding: 2px 0px;
      overflow: hidden;

      .document {
        overflow: auto;
        width: 100%;
        height: 100%;
        padding: 15px;
      }
    }
  }
}
</style>
<style lang="scss">
.document {
  color: #444444;
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 6px 0px;
    border-bottom: 2px solid #273c75;
    font-size: 21px;
  }
  h2 {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 4px 0px;
    padding-bottom: 4px;
    border-bottom: 1px solid #273c75;
    font-size: 18px;
  }
  h3 {
    margin-top: 14px;
    margin-bottom: 14px;
    padding: 0px 8px;
    border-left: 3px solid #273c75;
    font-size: 16px;
  }
  h4 {
    margin-top: 14px;
    margin-bottom: 14px;
    padding: 0px 0px;
    font-size: 14px;
  }
  h5 {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px 0px;
    font-size: 12px;
  }
  h6 {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 0px 0px;
    font-size: 10px;
  }

  ul {
    margin: 0px;
    padding: 5px 23px;
  }

  hr {
    border: 0px;
    border-top: 1px solid #273c75;
  }

  pre {
    padding: 10px;
    background-color: #000000;
    font-size: 12px;
    border: 1px solid #000000;
    border-radius: 3px;

    code {
      background-color: #000000 !important;
      line-height: 16px;
      font-family: Consolas, Monaco, monospace !important;
    }
  }

  blockquote {
    margin: 0px 0px 0px 10px;
    p {
      border-left: 4px solid #dddddd;
      padding: 3px 9px;
    }
  }

  .toc-anchor-link {
    color: #273c75;
  }

  table {
    border: 1px solid #dddddd;
    border-collapse: collapse;
    th,
    td {
      padding: 6px 16px;
      border: 1px solid #dddddd;
    }
    th {
      background-color: #f5f5f5;
    }
  }
}
</style>