<template>
  <div class="folder-edit">
    <div class="inner">
      <table class="setting-table">
        <tbody>
          <tr>
            <th>フォルダ名</th>
            <td><input type="text" value="" /></td>
          </tr>
          <tr>
            <th>フォルダ名</th>
            <td><input type="text" value="" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folder-edit {
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  padding: 2px 0px;
  background-color: #fbfbfb;
  
  .inner {
    padding: 15px;

    .setting-table {
      border-collapse: collapse;

      th, td {
        padding: 8px 6px;
      }
      th {
        width: 150px;
        font-weight: 100;
        color: #666666;
      }
      td {

        input[type="text"] {
          background-color: #ffffff;
          border: 1px solid #bbbbbb;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 14px;
          min-width: 200px;

          &:focus {
            border: 1px solid #3498db;
          }
        }
      }
    }
  }
}
</style>