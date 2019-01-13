<template>
  <div class="team-create-form">
    <div class="section">
      <h1>チーム作成</h1>
      <p>新しいメンバーとチームを組んで仕事を始めましょう。</p>
    </div>
    <div class="section">
      <md-field :class="messageClass">
        <label>新しいチーム名</label>
        <md-input v-model="team.name" required :disabled="buttonActivate"></md-input>
        <span class="md-helper-text">全角30文字まで</span>
        <span class="md-error">There is an error</span>
      </md-field>
      <br>
      <md-field>
        <label>チームの説明</label>
        <md-textarea v-model="team.abstract" md-autogrow :disabled="buttonActivate"></md-textarea>
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
              <md-button
                class="member-add-button md-icon-button md-primary"
                @click="showDialog = true"
                :disabled="buttonActivate"
              >
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
              <md-checkbox
                v-model="item.auth"
                value="1"
                class="md-primary"
                :disabled="buttonActivate"
              ></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="メンバー">
              <md-checkbox
                v-model="item.auth"
                value="2"
                class="md-primary"
                :disabled="buttonActivate"
              ></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="管理者">
              <md-checkbox
                v-model="item.auth"
                value="3"
                class="md-primary"
                :disabled="buttonActivate"
              ></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label>
              <md-button class="md-icon-button" :disabled="buttonActivate">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <br>
    <div class="submit-button-box">
      <md-button :md-ripple="false" :disabled="buttonActivate">キャンセル</md-button>
      <md-button
        class="md-raised md-primary"
        @click="buttonActivate = true"
        :disabled="buttonActivate"
      >チームを作成</md-button>
    </div>
    <!-- ダイアログ -->
    <md-dialog :md-active.sync="showDialog" class="friend-table">
      <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">友達</h1>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="氏名で検索" v-model="search" @input="searchOnTable"/>
            </md-field>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }" @click="showDialog = false">
            <md-table-cell md-label>
              <md-avatar>
                <img src="../assets/test/user-icon1.jpg" alt="Avatar">
              </md-avatar>
            </md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </md-dialog>
  </div>
</template>

<script>
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
  name: "TeamCreate",
  data: () => ({
    team: {
      name: "",
      abstract: "",
      members: [{ name: "yumochi21", auth: ["1", "2", "3"] }]
    },
    buttonActivate: false,
    showDialog: false,
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner"
      },
      {
        id: 2,
        name: "Odette Demageard",
        email: "odemageard1@spotify.com",
        gender: "Female",
        title: "Account Coordinator"
      },
      {
        id: 3,
        name: "Vera Taleworth",
        email: "vtaleworth2@google.ca",
        gender: "Male",
        title: "Community Outreach Specialist"
      },
      {
        id: 4,
        name: "Lonnie Izkovitz",
        email: "lizkovitz3@youtu.be",
        gender: "Female",
        title: "Operator"
      },
      {
        id: 5,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 6,
        name: "Karim Chipping",
        email: "kchipping5@scribd.com",
        gender: "Female",
        title: "Safety Technician II"
      },
      {
        id: 7,
        name: "Helge Holyard",
        email: "hholyard6@howstuffworks.com",
        gender: "Female",
        title: "Internal Auditor"
      },
      {
        id: 8,
        name: "Rod Titterton",
        email: "rtitterton7@nydailynews.com",
        gender: "Male",
        title: "Technical Writer"
      },
      {
        id: 9,
        name: "Gawen Applewhite",
        email: "gapplewhite8@reverbnation.com",
        gender: "Female",
        title: "GIS Technical Architect"
      },
      {
        id: 10,
        name: "Nero Mulgrew",
        email: "nmulgrew9@plala.or.jp",
        gender: "Female",
        title: "Staff Scientist"
      },
      {
        id: 11,
        name: "Cybill Rimington",
        email: "crimingtona@usnews.com",
        gender: "Female",
        title: "Assistant Professor"
      },
      {
        id: 12,
        name: "Maureene Eggleson",
        email: "megglesonb@elpais.com",
        gender: "Male",
        title: "Recruiting Manager"
      },
      {
        id: 13,
        name: "Cortney Caulket",
        email: "ccaulketc@cbsnews.com",
        gender: "Male",
        title: "Safety Technician IV"
      },
      {
        id: 14,
        name: "Selig Swynfen",
        email: "sswynfend@cpanel.net",
        gender: "Female",
        title: "Environmental Specialist"
      },
      {
        id: 15,
        name: "Ingar Raggles",
        email: "iragglese@cbc.ca",
        gender: "Female",
        title: "VP Sales"
      },
      {
        id: 16,
        name: "Karmen Mines",
        email: "kminesf@topsy.com",
        gender: "Male",
        title: "Administrative Officer"
      },
      {
        id: 17,
        name: "Salome Judron",
        email: "sjudrong@jigsy.com",
        gender: "Male",
        title: "Staff Scientist"
      },
      {
        id: 18,
        name: "Clarinda Marieton",
        email: "cmarietonh@theatlantic.com",
        gender: "Male",
        title: "Paralegal"
      },
      {
        id: 19,
        name: "Paxon Lotterington",
        email: "plotteringtoni@netvibes.com",
        gender: "Female",
        title: "Marketing Assistant"
      },
      {
        id: 20,
        name: "Maura Thoms",
        email: "mthomsj@webeden.co.uk",
        gender: "Male",
        title: "Actuary"
      }
    ]
  }),
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable: function() {
      this.searched = searchByName(this.users, this.search);
    }
  },
  created: function() {
    this.searched = this.users;
  },
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
  width: 650px;
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
    .md-ripple {
      color: #ffffff;
    }
  }

  .submit-button-box {
    text-align: right;
    padding: 30px 0px 10px 0px;
  }
}
.md-dialog {
  width: 450px;
}
</style>