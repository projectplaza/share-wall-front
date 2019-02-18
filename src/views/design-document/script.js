import VueMarkdown from "vue-markdown";
import draggable from "vuedraggable";
import FolderEdit from "../../components/design-document/FolderEdit";

const folders = [
  { code: "000001", name: "要件定義書", className: { opened: false } },
  { code: "000002", name: "機能設計書", className: { opened: true } },
  { code: "000003", name: "詳細設計書", className: { opened: false } }
]

const files = [
  { code: "000001", name: "DesignDocument機能", className: { selected: false } },
  { code: "000002", name: "ウォール機能", className: { selected: true } },
  { code: "000003", name: "task12", className: { selected: false } }
]

const designDocumentApp = {
  name: "design-document",
  data: () => ({
    leftMenu: {
      folders: folders,
      files: files,
    },
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

  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    })
  },

  created: function () {
    console.log(this.$route.params.documentCode);
  },
  components: {
    VueMarkdown,
    FolderEdit,
    draggable
  }
};

export default designDocumentApp;