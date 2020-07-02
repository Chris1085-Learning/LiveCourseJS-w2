const product = {
  data: [],
  getData() {
    const uuid = "017c2859-74ba-4b94-af09-246e50d8864f";
    const apiPath = "https://course-ec-api.hexschool.io/";
    const api = `${apiPath}api/${uuid}/ec/products`;
    let vm = this;

    axios.get(api).then(function (res) {
      // console.log(res);
      vm.data = res.data.data;
      vm.render();
      console.log(res);
    });
  },
  render() {
    // console.log(this.data);
    const productList = document.querySelector(".card-deck");
    const productData = this.data;
    let str = "";

    productData.forEach((item) => {
      // 每三個digits加入 "," symbol
      item.price = new Intl.NumberFormat().format(item.price);
      item.origin_price = new Intl.NumberFormat().format(item.origin_price);

      // 判斷是否有優惠價格
      const originPriceTitle = item.origin_price == item.price ? "" : "建議售價 ";
      const originPrice = item.origin_price == item.price ? "" : item.origin_price;
      const priceTitle = item.origin_price == item.price ? "建議售價" : "優惠 ";

      // render 顧客平均星星
      const starStr = this.renderStar(item.options.rate);

      str += `
      <li class="card">
          <div class="productImage">
            <img src="${item.imageUrl[0]}" class="card-img-top" alt="${item.title}" />
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title font-weight-bold">${item.title}</h5>
              <p class="card-text">
                ${item.content}
              </p>
            </div>
          </div>
          <div class="card-footer">
            <p class="text-right mb-1 font-weight-bolder text-secondary">
              ${originPriceTitle}<span class="text-line-through">${originPrice}</span>
            </p>
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                ${starStr}
                <a href="" class="ml-1">(${item.options.rateCount})</a>
              </div>
              <div class="d-flex align-items-center">
                <p class="fz-l text-right font-weight-bolder text-danger">${priceTitle} <span>${item.price}</span></p>
              </div>
            </div>
          </div>
        </li>
      `;
    });

    productList.innerHTML = str;
  },

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  },
  renderStar(rate) {
    const starRate = Math.ceil(rate);
    let str = "";
    for (let index = 1; index < 6; index++) {
      // 判斷平均星星是否為float，if true 且 index == 該位置畫半顆星，其餘全顆星，或空星
      if (this.isFloat(rate) && starRate == index) {
        str += `<span class="material-icons rating"><abbr title="${rate}"> star_half </span>`;
      } else if (starRate >= index) {
        str += `<span class="material-icons rating"><abbr title="${rate}"> star </span>`;
      } else if (starRate < index) {
        str += `<span class="material-icons rating"><abbr title="${rate}"> star_outline </span>`;
      }
    }
    return str;
  },
};

product.getData();
