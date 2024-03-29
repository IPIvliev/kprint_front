<template>
    <div class="usage">
        <div class="container">
            <h2 class="title">Наши партнёры</h2>

            <div class="row">
                <div class="col-xxl-3">
                    <div class="partner-card">
                        <div class="partner-img">
                            <img src="@/assets/img/partners/partner-1.png" alt="{{ article.title }}">
                        </div>
                        <div class="partner-content">
                            <div class="partner-title">
                                Наименование компании
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-3">
                    <div class="partner-card">
                        <div class="partner-img">
                            <img src="@/assets/img/partners/partner-1.png" alt="{{ article.title }}">
                        </div>
                        <div class="partner-content">
                            <div class="partner-title">
                                Наименование компании
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-3">
                    <div class="partner-card">
                        <div class="partner-img">
                            <img src="@/assets/img/partners/partner-rosatom.png" alt="{{ article.title }}">
                        </div>
                        <div class="partner-content">
                            <div class="partner-title">
                                Наименование компании
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-3">
                    <div class="partner-card">
                        <div class="partner-img">
                            <img src="@/assets/img/partners/partner-1.png" alt="{{ article.title }}">
                        </div>
                        <div class="partner-content">
                            <div class="partner-title">
                                Наименование компании
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.partner-card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 16px 16px 32px;
  height: 100%;
  color: #000;
  background: #FFFFFF;
  border-radius: 16px;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}

.partner-card:hover {
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
  cursor: pointer;
}

.partner-img {
  height: 264px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.partner-img img {
  width: 100%;
  height: 264px;
  -o-object-fit: cover;
  object-fit: cover;
}

.partner-content {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  padding: 32px 20px 0;
}

.partner-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 18px;
}
</style>