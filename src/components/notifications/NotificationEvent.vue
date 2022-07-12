<template>
  <div class="course-wrap table-responsive">
    <div class="header-tbl">
      <img src="../../assets/event.svg" alt="" />
      <h4 class="mb-0 mx-3">Ивенты</h4>
      <div>
        <p class="mb-0">12 <span class="mx-1 new">new</span></p>
      </div>
    </div>
    <table class="table">
      <tbody>
        <tr class="active">
          <td>ФИО</td>
          <td>Тел</td>
          <td>Курсы</td>
          <td>Группа</td>
          <td>Уровень</td>
          <td>Время</td>
        </tr>
        <tr class="active">
          <td>Кирилл Сопранский</td>
          <td>+998 93 995 5858</td>
          <td>Курсы Английского Языка</td>
          <td>А6</td>
          <td>Beginner</td>
          <td>14:00 - 15:30</td>
          <td class="text-center">
            <span class="new">new</span><br />
            <span>12:22</span>
          </td>
        </tr>
        <tr>
          <td>Кирилл Сопранский</td>
          <td>+998 93 995 5858</td>
          <td>Курсы Английского Языка</td>
          <td>А6</td>
          <td>Beginner</td>
          <td>14:00 - 15:30</td>
          <td class="text-center">
            <!-- <span class="new">new</span><br /> -->
            <span>12:22</span>
          </td>
        </tr>
        <tr>
          <td>Кирилл Сопранский</td>
          <td>+998 93 995 5858</td>
          <td>Курсы Английского Языка</td>
          <td>А6</td>
          <td>Beginner</td>
          <td>14:00 - 15:30</td>
          <td class="text-center">
            <!-- <span class="new">new</span><br /> -->
            <span>12:22</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-tbl {
  display: flex;
  gap: 8px;
  align-items: center;
  padding-bottom: 14px;
}
p {
  font-size: 13px;
  color: #9d9d9d;
  margin-top: 6px;
}
tr:first-child {
  border-bottom: 1px solid #010101;
}
tr {
  border-bottom: 1px solid #efefef;
}
td {
  font-size: 10px;
  color: #9d9d9d;
  padding: 4px;
}
.active td {
  color: #1b1b1d;
  font-weight: 600;
}
tr:first-child td {
  font-weight: bolder;
}
.new {
  background: #ed303b;
  color: #fff;
  border-radius: 9px;
  padding: 0px 8px 1px;
}
</style>
