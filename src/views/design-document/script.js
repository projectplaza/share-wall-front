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
    display: {
      mode: 'edit'
    },
    leftMenu: {
      folders: folders,
      files: files,
    },
    dialog: {
      folder: false,
      folderCreate: false,
      fileDelete: true
    },
    document: {
      code: '',
      source: `
コンセプト
=========

目的
----
・**ターゲット**が欲しい**価値**を最小の形で素早く提供する

・製品を提供できるコストを賄えるだけの**利益**を出す

ターゲット
-----------
・スタートアップ（Webサービス or Webシステム）
　　→　事業を始めようとしている１〜３人グループ

・インターネット上での作業に慣れている30後半までの人

価値
----
・複数のサービスに登録する必要がない
　　→　All in one

・？？？
　　→　１つにまとまっていることで、無駄な情報を入力する必要がなくなる

メモ
----
・最低限のやること、やりたいこと、作業の共有をする

・作業を効率化できる
　　→　オンライン上で作業を
　　→　**記録が残る**
　　→　検索ができる
　　→　紙だと探すのが大変

・**本来やらなきゃいけない作業に集中できる**
　　→　スタートアップの作業

・
　　→　違う時間帯に作業している人と仕事ができる

製品を提供できるコスト
------------------------
・**未定**

競合の定義
-----------
・ターゲットが重複している
・価格帯が同じ

参考サイト
-----------
https://www.missiondrivenbrand.jp/entry/kaitai_3C
`
    }
  }),

  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    }),
    boxStyle: function() {
      return (this.display.mode === 'edit') ? {width: '50%', display: 'inline-block'} : {width: '100%'}
    }
  },

  created: function () {
    this.document.code = this.$route.params.documentCode
  },
  components: {
    VueMarkdown,
    FolderEdit,
    draggable
  }
};

export default designDocumentApp;