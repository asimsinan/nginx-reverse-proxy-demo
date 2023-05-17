
let apiSecenekleri = {
  sunucu:"http://php:80",
  apiYolu: "/api"
}

const axios = require("axios");
hataGoster = function (req, res, hata) {
  let mesaj;
  let cevap = JSON.parse(JSON.stringify(hata));
  if (cevap.status == 404) {
    mesaj = "Sayfa bulunamadı!";
  } else if (cevap.status == 401) {
    mesaj = "Bu sayfaya erişmek için yetkiniz yok!";
  }
  else if (cevap.status == 400) {
    mesaj = "Girilmesi gereken alanlardan birini boş geçtiniz!";
  }
  else
  mesaj = "İşlem başarısız!";
  res.render("error", {
    mesaj: mesaj
  });
};

const mesafeyiFormatla = function (mesafe) {
  let yeniMesafe, birim;
  if (mesafe > 1) {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = " km";
  } else {
    yeniMesafe = parseInt(mesafe * 1000, 10);
    birim = " m";
  }
  return yeniMesafe + birim;
};
const anaSayfa = function (req, res) {
  axios
    .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu, {
      params: {
        enlem: req.query.enlem,
        boylam: req.query.boylam,
      },
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then(function (response) {
      let i, mekanlar;
      mekanlar = JSON.parse(response.data).mekanlar;

      for (i = 0; i < mekanlar.length; i++) {
        mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe);
      }

      anaSayfaOlustur(req, res, mekanlar);
    })
    .catch(function (hata) {
      hataGoster(req, res, hata);
    });
};
const anaSayfaOlustur = function (req, res, mekanListesi) {
  res.render("anasayfa", {
    baslik: "Anasayfa",
    sayfaBaslik: {
      siteAd: "MekanBul",
      slogan: "Civardaki Mekanları Keşfet!",
    },
    mekanlar: mekanListesi,
  });
};
const mekanBilgisi = function (req, res) {
  axios
    .get(
      apiSecenekleri.sunucu +
        apiSecenekleri.apiYolu+"?id="+req.params.mekanid,
        {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    )
    .then(function (response) {
      mekanBilgisiSayfasiOlustur(req, res, JSON.parse(response.data));
    })
    .catch(function (hata) {
      hataGoster(req, res, hata);
    });
};
const mekanBilgisiSayfasiOlustur = function (req, res, mekanDetaylari) {
  
  mekanDetaylari.koordinat = {
    enlem: mekanDetaylari.koordinat[0],
    boylam: mekanDetaylari.koordinat[1],
  };
  res.render("mekanbilgisi", {
    mekanBaslik: mekanDetaylari.ad,
    mekanDetay: mekanDetaylari,
  });
};
module.exports = {
  anaSayfa,
  mekanBilgisi,
};
