<template>
  <div class="n-header">
    <!-- <div v-if="Object.keys(business)?.length !== 0" class="left"> -->
    <div class="left">
      <div v-if="business?.user?.logo" class="img-left">
        <img :src="'https://e-hub.uz' + business.user.logo" alt="" />
      </div>
      <div class="content-left">
        <h4>{{ business.user.name }}</h4>
        <span>
          {{ business.user.description }}
        </span>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div
          @click="getCircle('student')"
          class="base circle-user"
          :class="showBelow === 'student' ? 'active-bg' : ''"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9998 11.9167C15.3931 11.9167 17.3332 9.97657 17.3332 7.58333C17.3332 5.1901 15.3931 3.25 12.9998 3.25C10.6066 3.25 8.6665 5.1901 8.6665 7.58333C8.6665 9.97657 10.6066 11.9167 12.9998 11.9167Z"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.5 22.75V20.5833C6.5 19.4341 6.95655 18.3319 7.7692 17.5192C8.58186 16.7065 9.68406 16.25 10.8333 16.25H15.1667C16.3159 16.25 17.4181 16.7065 18.2308 17.5192C19.0435 18.3319 19.5 19.4341 19.5 20.5833V22.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="each-page">Студенты</div>
        </div>
        <div
          @click="getCircle('groups')"
          class="base circle-students"
          :class="showBelow === 'groups' ? 'active-bg' : ''"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 13.75C14.0114 13.75 16.25 11.5114 16.25 8.75C16.25 5.98858 14.0114 3.75 11.25 3.75C8.48858 3.75 6.25 5.98858 6.25 8.75C6.25 11.5114 8.48858 13.75 11.25 13.75Z"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="each-page">Группы</div>
        </div>
        <div
          @click="getCircle('module')"
          class="base circle-book"
          :class="showBelow === 'module' ? 'active-bg' : ''"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 5V27.5M7.5 5H21.25C21.913 5 22.5489 5.26339 23.0178 5.73223C23.4866 6.20107 23.75 6.83696 23.75 7.5V22.5C23.75 23.163 23.4866 23.7989 23.0178 24.2678C22.5489 24.7366 21.913 25 21.25 25H7.5C7.16848 25 6.85054 24.8683 6.61612 24.6339C6.3817 24.3995 6.25 24.0815 6.25 23.75V6.25C6.25 5.91848 6.3817 5.60054 6.61612 5.36612C6.85054 5.1317 7.16848 5 7.5 5V5Z"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.25 10H18.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.25 15H18.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="each-page">Модули</div>
        </div>
        <div
          @click="getCircle('tb')"
          class="base circle0"
          :class="showBelow === 'tb' ? 'active-bg' : ''"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7438 26.25H6.25C5.58696 26.25 4.95107 25.9866 4.48223 25.5178C4.01339 25.0489 3.75 24.413 3.75 23.75V8.75C3.75 8.08696 4.01339 7.45107 4.48223 6.98223C4.95107 6.51339 5.58696 6.25 6.25 6.25H21.25C21.913 6.25 22.5489 6.51339 23.0178 6.98223C23.4866 7.45107 23.75 8.08696 23.75 8.75V13.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5 27.5C25.2614 27.5 27.5 25.2614 27.5 22.5C27.5 19.7386 25.2614 17.5 22.5 17.5C19.7386 17.5 17.5 19.7386 17.5 22.5C17.5 25.2614 19.7386 27.5 22.5 27.5Z"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.75 3.75V8.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.75 3.75V8.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.75 13.75H23.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5 20.62V22.5L23.75 23.75"
              stroke="#B6BCCB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="each-page">Расписания</div>
        </div>
        <div
          @click="getCircle('qr')"
          class="base circle1"
          :class="showBelow === 'qr' ? 'active-bg' : ''"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="0.1"
          >
            <path
              d="M18.2999 11.0167C18.7141 11.0167 19.0499 10.6809 19.0499 10.2667C19.0499 9.85245 18.7141 9.51666 18.2999 9.51666V11.0167ZM24.5999 9.51666C24.1857 9.51666 23.8499 9.85245 23.8499 10.2667C23.8499 10.6809 24.1857 11.0167 24.5999 11.0167V9.51666ZM24.5999 31.5667C24.1857 31.5667 23.8499 31.9024 23.8499 32.3167C23.8499 32.7309 24.1857 33.0667 24.5999 33.0667V31.5667ZM17.3999 33.0667C17.8141 33.0667 18.1499 32.7309 18.1499 32.3167C18.1499 31.9024 17.8141 31.5667 17.3999 31.5667V33.0667ZM10.9499 24.9667C10.9499 24.5524 10.6141 24.2167 10.1999 24.2167C9.78569 24.2167 9.4499 24.5524 9.4499 24.9667H10.9499ZM32.5499 24.9667C32.5499 24.5524 32.2141 24.2167 31.7999 24.2167C31.3857 24.2167 31.0499 24.5524 31.0499 24.9667H32.5499ZM8.3999 17.9167C7.98569 17.9167 7.6499 18.2524 7.6499 18.6667C7.6499 19.0809 7.98569 19.4167 8.3999 19.4167V17.9167ZM33.5999 19.4167C34.0141 19.4167 34.3499 19.0809 34.3499 18.6667C34.3499 18.2524 34.0141 17.9167 33.5999 17.9167V19.4167ZM16.4198 27.7733L16.0793 28.4416H16.0793L16.4198 27.7733ZM15.0432 26.3967L15.7115 26.0562L15.0432 26.3967ZM26.9566 26.3967L27.6248 26.7372L26.9566 26.3967ZM25.58 27.7733L25.9205 28.4416L25.58 27.7733ZM25.58 14.81L25.2395 15.4782V15.4782L25.58 14.81ZM26.9566 16.1866L27.6248 15.8461V15.8461L26.9566 16.1866ZM16.4198 14.81L16.0793 14.1417L16.4198 14.81ZM15.0432 16.1866L14.375 15.8461L15.0432 16.1866ZM27.287 22.7024L26.5462 22.8197L26.5462 22.8197L27.287 22.7024ZM26.4142 21.8296L26.5315 21.0888H26.5315L26.4142 21.8296ZM14.7128 22.7024L15.4536 22.8197V22.8197L14.7128 22.7024ZM15.5856 21.8296L15.4683 21.0888H15.4683L15.5856 21.8296ZM31.0499 15.7792V17.6167H32.5499V15.7792H31.0499ZM10.9499 17.6167V15.7792H9.4499V17.6167H10.9499ZM15.5999 11.0167H18.2999V9.51666H15.5999V11.0167ZM24.5999 11.0167H26.3999V9.51666H24.5999V11.0167ZM26.3999 31.5667H24.5999V33.0667H26.3999V31.5667ZM17.3999 31.5667H15.5999V33.0667H17.3999V31.5667ZM10.9499 26.8042V24.9667H9.4499V26.8042H10.9499ZM31.0499 24.9667V26.8042H32.5499V24.9667H31.0499ZM15.5999 31.5667C13.0463 31.5667 10.9499 29.4491 10.9499 26.8042H9.4499C9.4499 30.2482 12.1888 33.0667 15.5999 33.0667V31.5667ZM26.3999 33.0667C29.811 33.0667 32.5499 30.2482 32.5499 26.8042H31.0499C31.0499 29.4491 28.9535 31.5667 26.3999 31.5667V33.0667ZM32.5499 15.7792C32.5499 12.3351 29.811 9.51666 26.3999 9.51666V11.0167C28.9535 11.0167 31.0499 13.1343 31.0499 15.7792H32.5499ZM10.9499 15.7792C10.9499 13.1343 13.0463 11.0167 15.5999 11.0167V9.51666C12.1888 9.51666 9.4499 12.3351 9.4499 15.7792H10.9499ZM8.3999 19.4167H33.5999V17.9167H8.3999V19.4167ZM19.7399 15.2167H22.2599V13.7167H19.7399V15.2167ZM22.2599 27.3667H19.7399V28.8667H22.2599V27.3667ZM19.7399 27.3667C18.8454 27.3667 18.2197 27.3661 17.7321 27.3262C17.2532 27.2871 16.9739 27.2139 16.7603 27.1051L16.0793 28.4416C16.5396 28.6761 17.0383 28.7745 17.6099 28.8213C18.1728 28.8672 18.8702 28.8667 19.7399 28.8667V27.3667ZM13.9499 23.0767C13.9499 23.9464 13.9493 24.6438 13.9953 25.2066C14.042 25.7783 14.1405 26.277 14.375 26.7372L15.7115 26.0562C15.6027 25.8427 15.5295 25.5634 15.4903 25.0845C15.4505 24.5969 15.4499 23.9711 15.4499 23.0767H13.9499ZM16.7603 27.1051C16.3087 26.875 15.9416 26.5078 15.7115 26.0562L14.375 26.7372C14.7489 27.4711 15.3455 28.0677 16.0793 28.4416L16.7603 27.1051ZM26.5499 23.0767C26.5499 23.9711 26.5493 24.5969 26.5095 25.0845C26.4704 25.5634 26.3971 25.8427 26.2883 26.0562L27.6248 26.7372C27.8593 26.277 27.9578 25.7783 28.0045 25.2066C28.0505 24.6438 28.0499 23.9464 28.0499 23.0767H26.5499ZM22.2599 28.8667C23.1296 28.8667 23.827 28.8672 24.3899 28.8213C24.9615 28.7745 25.4602 28.6761 25.9205 28.4416L25.2395 27.1051C25.0259 27.2139 24.7466 27.2871 24.2677 27.3262C23.7801 27.3661 23.1544 27.3667 22.2599 27.3667V28.8667ZM26.2883 26.0562C26.0582 26.5078 25.6911 26.875 25.2395 27.1051L25.9205 28.4416C26.6543 28.0677 27.2509 27.4711 27.6248 26.7372L26.2883 26.0562ZM22.2599 15.2167C23.1544 15.2167 23.7801 15.2172 24.2677 15.2571C24.7466 15.2962 25.0259 15.3694 25.2395 15.4782L25.9205 14.1417C25.4602 13.9072 24.9615 13.8088 24.3899 13.7621C23.827 13.7161 23.1296 13.7167 22.2599 13.7167V15.2167ZM25.2395 15.4782C25.6911 15.7083 26.0582 16.0755 26.2883 16.5271L27.6248 15.8461C27.2509 15.1123 26.6543 14.5156 25.9205 14.1417L25.2395 15.4782ZM19.7399 13.7167C18.8702 13.7167 18.1728 13.7161 17.6099 13.7621C17.0383 13.8088 16.5396 13.9072 16.0793 14.1417L16.7603 15.4782C16.9739 15.3694 17.2532 15.2962 17.7321 15.2571C18.2197 15.2172 18.8454 15.2167 19.7399 15.2167V13.7167ZM16.0793 14.1417C15.3455 14.5156 14.7489 15.1123 14.375 15.8461L15.7115 16.5271C15.9416 16.0755 16.3087 15.7083 16.7603 15.4782L16.0793 14.1417ZM15.9599 22.5667H26.0399V21.0667H15.9599V22.5667ZM15.4517 18.6719C15.4604 17.4159 15.5214 16.9001 15.7115 16.5271L14.375 15.8461C13.9972 16.5875 13.96 17.4711 13.9517 18.6615L15.4517 18.6719ZM28.0481 18.6615C28.0398 17.4711 28.0026 16.5875 27.6248 15.8461L26.2883 16.5271C26.4784 16.9001 26.5394 17.4159 26.5481 18.6719L28.0481 18.6615ZM28.0499 23.0767C28.0499 22.9102 28.0522 22.7397 28.0277 22.5851L26.5462 22.8197C26.5455 22.8149 26.5474 22.8235 26.5486 22.8675C26.5498 22.9138 26.5499 22.9751 26.5499 23.0767H28.0499ZM26.0399 22.5667C26.1415 22.5667 26.2027 22.5667 26.249 22.568C26.2931 22.5692 26.3016 22.5711 26.2968 22.5704L26.5315 21.0888C26.3769 21.0643 26.2063 21.0667 26.0399 21.0667V22.5667ZM28.0277 22.5851C27.9058 21.8149 27.3017 21.2108 26.5315 21.0888L26.2968 22.5704C26.4252 22.5907 26.5259 22.6914 26.5462 22.8197L28.0277 22.5851ZM15.4499 23.0767C15.4499 22.9751 15.45 22.9138 15.4512 22.8675C15.4524 22.8235 15.4544 22.8149 15.4536 22.8197L13.9721 22.5851C13.9476 22.7397 13.9499 22.9102 13.9499 23.0767H15.4499ZM15.9599 21.0667C15.7935 21.0667 15.6229 21.0643 15.4683 21.0888L15.703 22.5704C15.6982 22.5711 15.7067 22.5692 15.7508 22.568C15.7971 22.5667 15.8583 22.5667 15.9599 22.5667V21.0667ZM15.4536 22.8197C15.4739 22.6914 15.5746 22.5907 15.703 22.5704L15.4683 21.0888C14.6981 21.2108 14.0941 21.8149 13.9721 22.5851L15.4536 22.8197Z"
              fill="#BDBDCD"
            />
          </svg>
          <div class="each-page">QR</div>
        </div>
        <div
          @click="getCircle('ntf')"
          class="base circle2 position-relative"
          :class="showBelow === 'ntf' ? 'active-bg' : ''"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 6.25C12.5 5.58696 12.7634 4.95107 13.2322 4.48223C13.7011 4.01339 14.337 3.75 15 3.75C15.663 3.75 16.2989 4.01339 16.7678 4.48223C17.2366 4.95107 17.5 5.58696 17.5 6.25C18.9355 6.92878 20.1593 7.98541 21.0401 9.30662C21.9209 10.6278 22.4256 12.1638 22.5 13.75V17.5C22.5941 18.2771 22.8693 19.0213 23.3035 19.6727C23.7377 20.324 24.3188 20.8643 25 21.25H5C5.68117 20.8643 6.26226 20.324 6.69648 19.6727C7.13071 19.0213 7.40593 18.2771 7.5 17.5V13.75C7.57445 12.1638 8.07913 10.6278 8.95994 9.30662C9.84075 7.98541 11.0645 6.92878 12.5 6.25"
              stroke="#B6BCCB"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.25 21.25V22.5C11.25 23.4946 11.6451 24.4484 12.3483 25.1517C13.0516 25.8549 14.0054 26.25 15 26.25C15.9946 26.25 16.9484 25.8549 17.6517 25.1517C18.3549 24.4484 18.75 23.4946 18.75 22.5V21.25"
              stroke="#B6BCCB"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span id="small-circle">{{ notifications }}</span>
          <div class="each-page">Уведомления</div>
        </div>
        <div @click.stop="showSignOut" class="admin">
          <div class="admin-title">
            <h5 class="mb-0">
              {{ business?.user.user_full_name }}
            </h5>
            <span>Администратор</span>
          </div>
          <div class="admin-img"></div>
          <transition name="dd">
            <div v-if="isSignOutVisible" @click.stop="" class="sign-out">
              <div @click="signOut" class="dd d-flex align-items-center gap-1">
                <img src="../../assets/log-out.svg" alt="" />
                <p class="mb-0">Выйти из аккаунта</p>
              </div>
              <!-- <div
                @click="selectStaff"
                class="dd d-flex align-items-center gap-1"
                :class="showBelow === 'staff' ? 'active-dd' : ''"
              >
                <img src="../../assets/bag.svg" alt="" />
                <p class="mb-0">Сотрудники</p>
              </div> -->
            </div>
          </transition>
        </div>
      </div>
      <div v-if="showBelow === 'ntf'" class="right-bottom">
        <div class="btn-group" role="group">
          <button
            @click="filterNotifications('today')"
            type="button"
            class="btn"
            :class="activeTab === 'today' ? 'active-tab' : ''"
          >
            Сегодня
          </button>
          <button
            @click="filterNotifications('yesterday')"
            type="button"
            class="btn"
            :class="activeTab === 'yesterday' ? 'active-tab' : ''"
          >
            Вчера
          </button>
          <button
            @click="filterNotifications('week')"
            type="button"
            class="btn"
            :class="activeTab === 'week' ? 'active-tab' : ''"
          >
            Неделя
          </button>
          <button
            @click="filterNotifications('month')"
            type="button"
            class="btn"
            :class="activeTab === 'month' ? 'active-tab' : ''"
          >
            Месяц
          </button>
          <button
            @click="filterNotifications('quarter')"
            type="button"
            class="btn"
            :class="activeTab === 'quarter' ? 'active-tab' : ''"
          >
            Квартал
          </button>
          <button
            @click="filterNotifications('year')"
            type="button"
            class="btn"
            :class="activeTab === 'year' ? 'active-tab' : ''"
          >
            Год
          </button>
        </div>
        <div @click.stop="showCalendar" class="calendar-wrap">
          <div class="cal"></div>
          <div class="info position-relative">
            {{ startDate }} - {{ finishDate }}
            <transition name="dd">
              <div
                v-if="isCalendarOpen"
                @click.stop=""
                class="calendar-pp d-flex gap-3 text-center"
              >
                <div>
                  <h6>Дата начала</h6>
                  <input
                    v-model="startDate"
                    type="date"
                    class="form-control"
                    placeholder="home"
                  />
                </div>
                <div>
                  <h6>Дата окончания</h6>
                  <input
                    v-model="finishDate"
                    type="date"
                    class="form-control"
                    placeholder="home"
                  />
                </div>
              </div>
            </transition>
          </div>
          <div class="triangle mx-2">
            <img src="../../assets/polygon.svg" alt="" />
          </div>
        </div>
      </div>
      <div v-else-if="showBelow === 'tb'" class="right-bottom">
        <div class="btn-group" role="group">
          <button
            @click="filterTT('odd')"
            type="button"
            class="btn"
            :class="tt === 'odd' ? 'active-tab' : ''"
          >
            Нечетные
          </button>
          <button
            @click="filterTT('even')"
            type="button"
            class="btn"
            :class="tt === 'even' ? 'active-tab' : ''"
          >
            Четные
          </button>
          <div>
            <base-dropdown
              :options="weeks"
              :tt="tt"
              @input="filterTT($event)"
              default="Выбрать день"
            ></base-dropdown>
          </div>
        </div>
      </div>
      <div v-else-if="showBelow === 'module'" class="right-bottom">
        <input
          @click="createLevel"
          type="button"
          class="btn btn-primary module-btn"
          value="Добавить уровень"
        />
        <input
          @click="createModule"
          type="button"
          class="btn btn-primary module-btn"
          value="Добавить модуль"
        />
      </div>
      <div v-else-if="showBelow === 'groups'" class="right-bottom">
        <input
          @click="createGroup"
          type="button"
          class="btn btn-primary module-btn"
          value="Добавить группу"
        />
      </div>
      <div v-else-if="showBelow === 'student'" class="right-bottom">
        <input
          @click="createStudent"
          type="button"
          class="btn btn-primary module-btn"
          value="Добавить студента"
        />
      </div>
      <!-- <div v-else-if="showBelow === 'staff'" class="right-bottom">
        <input
          type="button"
          class="btn btn-primary module-btn"
          value="Добавить сотрудника"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import BaseDropdown from "../UI/BaseDropdown.vue";
export default {
  props: [
    "notifications",
    "isCalendarOpen",
    "isSignOutVisible",
    "period",
    "showBelow",
    "tt",
  ],
  emits: [
    "getNotification",
    "toggleCalendar",
    "getInnerSignOut",
    "sendDates",
    "sendFilterTT",
  ],
  components: {
    BaseDropdown,
  },
  data() {
    return {
      startDate: "",
      finishDate: "",
      activeTab: "today",
      triggerCircle: false,
      business: JSON.parse(localStorage.getItem("info")),
      weeks: [
        {
          id: "1",
          name: "Понедельник",
        },
        { id: "2", name: "Вторник" },
        { id: "3", name: "Среда" },
        { id: "4", name: "Четверг" },
        { id: "5", name: "Пятница" },
        { id: "6", name: "Суббота" },
        { id: "7", name: "Воскресенье" },
      ],
    };
  },
  methods: {
    createStudent() {
      this.$store.dispatch("getIsStudent", "create");
    },
    createGroup() {
      this.$store.dispatch("getIsGroup", "create");
    },
    selectStaff() {
      this.showSignOut();
      this.getCircle("staff");
    },
    createLevel() {
      this.$store.dispatch("changeCreateLevel");
    },
    createModule() {
      this.$store.dispatch("changeCreateModule");
    },
    filterTT(val) {
      this.$emit("sendFilterTT", val);
    },
    getQrCode() {
      this.$router.push("/qr-code");
    },
    showCalendar() {
      this.$emit("toggleCalendar");
    },
    signOut() {
      localStorage.removeItem("info");
      localStorage.removeItem("userId");
      localStorage.removeItem("phone-number");
      localStorage.removeItem("token");
      window.open("", "_parent", "");
      window.close();
      // window.close();
    },
    showSignOut() {
      this.$emit("getInnerSignOut");
    },
    async filterNotifications(day, st, fi) {
      let start, finish;
      if (!st && !fi) {
        this.startDate = "";
        this.finishDate = "";
        let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10);

        if (day === "today") {
          this.activeTab = "today";
          let today = new Date().toISOString().slice(0, 10);
          start = today;
          finish = tomorrow;
        } else if (day === "yesterday") {
          this.activeTab = "yesterday";
          let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = yesterday;
          finish = tomorrow;
        } else if (day === "week") {
          this.activeTab = "week";
          let week = new Date(new Date().getTime() - 168 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = week;
          finish = tomorrow;
        } else if (day === "month") {
          this.activeTab = "month";
          let month = new Date(new Date().getTime() - 720 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = month;
          finish = tomorrow;
        } else if (day === "quarter") {
          this.activeTab = "quarter";
          let quarter = new Date(new Date().getTime() - 2160 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = quarter;
          finish = tomorrow;
        } else if (day === "year") {
          this.activeTab = "year";
          let year = new Date(new Date().getTime() - 8760 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = year;
          finish = tomorrow;
        } else {
          console.log(start);
          console.log(finish);
        }
      } else {
        start = st;
        finish = fi;
      }
      this.$emit("sendDates", { startDate: start, finishDate: finish });
      try {
        // console.log(start, finish);
        const res = await customAxios.get(
          `subscription-list/filter_notification/?module_id=${
            JSON.parse(localStorage.getItem("info")).user.id
          }&start_date=${start}&finish_date=${finish}`
          // {
          //   headers: {
          //     Authorization: `token ${
          //       JSON.parse(localStorage.getItem("info"))?.token
          //     }`,
          //   },
          // }
        );
        this.$store.commit("getNotifications", res);
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getCircle(val) {
      if (val === "qr") {
        try {
          const res = await customAxios.post(
            "operation/create_qr_image/",
            {
              module_id: JSON.parse(localStorage.getItem("info"))?.user.id,
            }
            // {
            //   headers: {
            //     Authorization: `token ${
            //       JSON.parse(localStorage.getItem("info"))?.token
            //     }`,
            //   },
            // }
          );
          this.$store.dispatch("getQR", res.data[0]);
        } catch (e) {
          this.$store.dispatch("errorHandle", e);
        }
      }
      this.$emit("getNotification", val);
    },
  },
  watch: {
    async startDate(val) {
      if (this.finishDate && val) {
        this.activeTab = "";
        this.filterNotifications(null, val, this.finishDate);
        // try {
        //   const res = await customAxios.get(
        //     `subscription-list/filter_notification/?module_id=${
        //       JSON.parse(localStorage.getItem("info"))?.user.id
        //     }&start_date=${val}&finish_date=${this.finishDate}`,
        //     {
        //       headers: {
        //         Authorization: `token ${
        //           JSON.parse(localStorage.getItem("info"))?.token
        //         }`,
        //       },
        //     }
        //   );
        //   this.$store.commit("getNotifications", res);
        // } catch (e) {
        //   this.$store.dispatch("errorHandle", e);
        // }
      }
    },
    async finishDate(val) {
      if (val && this.startDate) {
        this.activeTab = "";
        this.filterNotifications(null, this.startDate, val);
        // try {
        //   const res = await customAxios.get(
        //     `subscription-list/filter_notification/?module_id=${
        //       JSON.parse(localStorage.getItem("info"))?.user.id
        //     }&start_date=${this.startDate}&finish_date=${val}`,
        //     {
        //       headers: {
        //         Authorization: `token ${
        //           JSON.parse(localStorage.getItem("info"))?.token
        //         }`,
        //       },
        //     }
        //   );
        //   this.$store.commit("getNotifications", res);
        // } catch (e) {
        //   this.$store.dispatch("errorHandle", e);
        // }
      }
    },
  },
};
</script>

<style scoped>
.n-header {
  margin-top: 12px;
  max-height: 16vh;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 2;
  padding: 8px 8px 8px 4px;
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  flex: 3;
  position: relative;
}
.img-left {
  height: 15vh;
}
.img-left img {
  border-radius: 12px;
}
.content-left {
  width: 70%;
  line-height: 15px;
}
.img-left img {
  height: 100%;
  /* width: 100%; */
}
h4 {
  font-size: 20px;
  margin-bottom: 4px;
  color: #1b1b1d;
  font-weight: bold;
}
.content-left span {
  font-size: 13px;
  margin-bottom: 0;
  color: #aeaeae;
}
.right-top,
.right-bottom {
  display: flex;
  gap: 8px;
}
.calendar-wrap {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  background: #fff;
  cursor: pointer;
}
.info {
  font-size: 13px;
}
.base {
  position: relative;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.each-page {
  position: absolute;
  font-size: 12px;
  color: #016bd4;
  font-weight: 500;
  bottom: -1.2rem;
  display: none;
}
svg path {
  transition: all 0.1s ease;
}
.base:active {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.base.active-bg,
.base:hover {
  background: #016bd4;
}
.base.active-bg .each-page {
  display: initial;
}
.active-bg svg path,
.base:hover svg path {
  stroke: #fff;
}
.circle1.active-bg svg path,
.base.circle1:hover svg path {
  fill: #fff;
}
#small-circle {
  height: 16px;
  font-size: 10px;
  position: absolute;
  right: 7px;
  top: 6px;
  padding: 2px 5px 0;
  border-radius: 20px;
  color: #fff;
  background: #ea4335;
}
.admin-img {
  width: 40px;
  height: 40px;
  background: url("https://images.pexels.com/photos/1161267/pexels-photo-1161267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    no-repeat center;
  background-size: cover;
  border-radius: 50%;
}
.admin {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: end;
  padding: 1rem 6px 1rem 1rem;
  border-radius: 40px;
  align-items: center;
  height: 45px;
  line-height: 18px;
  background: #fff;
  cursor: pointer;
}
.sign-out {
  position: absolute;
  top: 45%;
  right: 0px;
  z-index: 100;
  border-radius: 12px;
  background: #fff;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
}
.sign-out .dd p {
  font-size: 13px;
  padding: 8px;
  color: #b6bccb;
}
.dd img {
  width: 24px;
  padding-left: 4px;
}
.sign-out .dd:hover,
.active-dd {
  background: #eeeeee;
  border-radius: 8px;
}
.dd.active-dd p {
  color: #000;
}
.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.dd-enter-to,
.dd-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.dd-enter-active,
.dd-leave-active {
  transition: all 0.3s ease;
}
.admin h5 {
  font-size: 13px;
  font-weight: 600;
}
.admin span {
  font-size: 12px;
  color: #9d9d9d;
}
.admin-img img {
  width: 100%;
}
button {
  font-size: 13px;
  background: #fff;
  color: #1b1b1d;
  padding: 8px 12px;
  transition: all 0.3 s ease;
}
button:hover,
button.active-tab {
  background: #016bd4;
  color: #fff;
}
button.active-tab svg path {
  fill: #fff;
}
.cal {
  width: 40px;
  height: 40px;
  background: url("../../assets/calendar2.svg") no-repeat center;
}
.calendar-pp {
  position: absolute;
  top: 2rem;
  right: -1.5rem;
  background: #fff;
  padding: 1rem;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
  border-radius: 6px;
}
.calendar-pp h6 {
  font-size: 15px;
}
::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
input[type="date"] {
  font-size: 14px;
  color: #1b1b1d;
}
.module-btn {
  font-size: 14px;
  border-radius: 5px;
}
</style>
