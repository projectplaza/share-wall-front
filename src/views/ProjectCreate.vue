<template>
  <div class="project-create-form">
    <div class="section">
      <h1>プロジェクト作成</h1>
      <p>チームメンバーと共に新しいプロジェクトを始めましょう。</p>
    </div>
    <div class="section">
      <md-field>
        <label>新しいプロジェクト名</label>
        <md-input v-model="project.name" required :disabled="button.disabled"></md-input>
        <span class="md-helper-text">全角30文字まで</span>
      </md-field>
      <br>
      <md-field>
        <label>プロジェクトの説明</label>
        <md-textarea v-model="project.abstract" md-autogrow :disabled="button.disabled"></md-textarea>
        <span class="md-helper-text">全角1,000文字まで</span>
      </md-field>
      <br>
      <br>
      <div class="member-select">
        <md-table v-model="people" md-card @md-selected="onSelect" md-fixed-header class="member-table">
          <md-table-toolbar>
            <h1 class="md-title">プロジェクトメンバー</h1>
          </md-table-toolbar>
          <md-table-row
            slot="md-table-row"
            slot-scope="{ item }"
            md-selectable="multiple"
            md-auto-select
          >
            <md-table-cell>
              <md-avatar>
                <img src="../assets/test/user-icon1.jpg" alt="Avatar">
              </md-avatar>
            </md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="リーダー">
              <md-checkbox
                v-model="item.auth"
                value="1"
                class="md-primary"
                :disabled="button.disabled"
              ></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="メンバー">
              <md-checkbox
                v-model="item.auth"
                value="2"
                class="md-primary"
                :disabled="button.disabled"
              ></md-checkbox>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <br>
    <div class="submit-button-box">
      <md-button :md-ripple="false" :disabled="button.disabled">キャンセル</md-button>
      <md-button class="md-raised md-primary" @click="create" :disabled="button.disabled">プロジェクトを作成</md-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }
  return items;
};

export default {
  name: "ProjectCreate",
  data: () => ({
    project: {
      name: "",
      abstract: ""
    },
    selected: [],
    button: {
      disabled: false
    },
    showDialog: false,
    search: null,
    searched: [],
    selected: [],
    people: [
      {
        id: 1,
        name: "Shawna Dubbin",
        auth: ['1','2']
      },
      {
        id: 2,
        name: "Odette Demageard",
        auth: ['2']
      },
      {
        id: 3,
        name: "Vera Taleworth",
        auth: ['2']
      },
      {
        id: 4,
        name: "Lonnie Izkovitz",
        auth: ['2']
      },
      {
        id: 5,
        name: "Thatcher Stave",
        auth: ['2']
      },
      {
        id: 6,
        name: "Karim Chipping",
        auth: ['2']
      },
      {
        id: 7,
        name: "Helge Holyard",
        auth: ['2']
      },
      {
        id: 8,
        name: "Rod Titterton",
        auth: ['2']
      },
      {
        id: 9,
        name: "Gawen Applewhite",
        auth: ['2']
      },
      {
        id: 10,
        name: "Nero Mulgrew",
        auth: ['2']
      }
    ]
  }),
  methods: {
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
    create() {
      this.showProgressBar()
      this.$set(this.button, 'disabled', true)
    },
    ...mapMutations("common", ["showProgressBar", "hideProgressBar"])
  }
};
</script>

<style lang="scss" scoped>
.project-create-form {
  position: relative;
  padding-top: 15px;
  padding-bottom: 50px;
  width: 650px;
  margin: auto;

  .section {
    padding: 10px 0px 5px 0px;
  }

  p {
    color: rgba(0, 0, 0, 0.54);
  }

  .member-select {
    .member-table {
      height: 500px;
    }
    .member-add-button {
      position: absolute;
      right: 20px;
    }
    .md-ripple {
      color: #ffffff;
    }
  }

  .submit-button-box {
    text-align: right;
    padding: 30px 0px 10px 0px;
  }
}
</style>