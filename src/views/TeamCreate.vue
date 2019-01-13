<template>
  <div class="team-create-form">
    <div class="section">
      <h1>チーム作成</h1>
      <p>新しいメンバーとチームを組んで仕事を始めましょう。</p>
    </div>
    <div class="section">
      <md-field :class="messageClass">
        <label>新しいチーム名</label>
        <md-input v-model="team.name" required></md-input>
        <span class="md-helper-text">全角30文字まで</span>
        <span class="md-error">There is an error</span>
      </md-field>
      <br>
      <md-field>
        <label>チームの説明</label>
        <md-textarea v-model="team.abstract" md-autogrow></md-textarea>
        <span class="md-helper-text">全角1,000文字まで</span>
        <span class="md-error">There is an error</span>
      </md-field>
      <br>
      <br>
      <div class="member-select">
        <md-table
          v-model="team.members"
          md-sort="name"
          md-sort-order="asc"
          md-card
          md-fixed-header
          class="member-table"
        >
          <md-table-toolbar>
            <h1 class="md-title">
              <span>メンバー</span>
              <md-button class="member-add-button md-icon-button md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{item}">
            <md-table-cell md-label>
              <md-avatar>
                <img src="../assets/test/user-icon1.jpg" alt="Avatar">
              </md-avatar>
            </md-table-cell>
            <md-table-cell md-label="氏名" md-sort-by="name">{{item.name}}</md-table-cell>
            <md-table-cell md-label="リーダー">
              <md-checkbox v-model="item.auth" value="1" class="md-primary"></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="メンバー">
              <md-checkbox v-model="item.auth" value="2" class="md-primary"></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="管理者">
              <md-checkbox v-model="item.auth" value="3" class="md-primary"></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label>
              <md-avatar class="md-avatar-icon md-small">
                <md-ripple>-</md-ripple>
              </md-avatar>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <br>
    <div class="submit-button-box">
      <md-button :md-ripple="false">キャンセル</md-button>
      <md-button class="md-raised md-primary">チームを作成</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamCreate",
  data: () => ({
    team: {
      name: "",
      abstract: "",
      members: [{ name: "yumochi21", auth: ["1", "2", "3"] }]
    }
  }),
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.team-create-form {
  position: relative;
  padding-top: 15px;
  padding-bottom: 50px;
  width: 700px;
  margin: auto;

  .section {
    padding: 10px 0px 5px 0px;
    // border-bottom: 1px solid #efefef;
  }

  p {
    color: rgba(0, 0, 0, 0.54);
  }

  .member-select {
    .member-table {
      height: 400px;
    }
    .member-add-button {
      position: absolute;
      right: 20px;
    }
    .md-avatar {
      margin-right: 12px;
      cursor: pointer;
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