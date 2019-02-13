import { mapMutations } from "vuex";
import { PATH_PROF, PATH_PROF_FRIEND, PATH_TEAM, PATH_TEAM_USER } from "../../constants/apiConstant";
import { getRequest, postRequest } from "../../utils/apiUtil";
import { isSingleByte } from "../../utils/validUtil";

/**
 * プロジェクト名のバリデーションを行う
 * @param {string} teamName プロジェクト名
 * @returns {boolean} 判定結果
 */
const validPjName = pjName => {
  if (pjName.length > 30) {
    return false;
  }
  return true;
};

/**
 * プロジェクトコードのバリデーションを行う
 * @param {string} pjCode プロジェクトコード
 * @returns {boolean} 判定結果
 */
const validPjCode = pjCode => {
  if (pjCode.length > 20) {
    return false;
  }
  for (var i = 0; i < pjCode.length; i++) {
    if (!isSingleByte(pjCode.charAt(i))) {
      return false;
    }
  }
  return true;
};

/**
 * プロジェクト説明のバリデーションを行う
 * @param {string} pjAbstract チーム説明
 * @returns {boolean} 判定結果
 */
const validPjAbstract = pjAbstract => {
  if (pjAbstract.length > 1000) {
    return false;
  }
  return true;
};

const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }
  return items;
};

/**
 * Vueオブジェクト
 */
const app = {

  name: "ProjectCreate",

  data: () => ({
    project: {
      name: '',
      abstract: '',
      code: '',
      members: []
    },
    selected: [],
    button: {
      disabled: false
    },
    showDialog: false,
    list: {
      users: []
    },
    people: [
      {
        id: 1,
        name: "Shawna Dubbin",
        auth: ['1', '2']
      }
    ]
  }),

  computed: {

    // プロジェクト名（テキストボックス）のクラスバインダ
    pjNameClass() {
      return {
        "md-invalid": !validPjName(this.project.name)
      };
    },

    // プロジェクトコード（テキストボックス）のクラスバインダ
    pjCodeClass() {
      return {
        "md-invalid": !validPjCode(this.project.code)
      };
    },

    // プロジェクト説明（テキストエリア）のクラスバインダ
    pjAbstractClass() {
      return {
        "md-invalid": !validPjAbstract(this.project.abstract)
      };
    },

  },

  methods: {

    // 作成イベント
    create() {
      this.showProgressBar()
      this.$set(this.button, 'disabled', true)
    },

    // Mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar"])
  }
};

export default app