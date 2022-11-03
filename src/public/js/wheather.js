console.log("salom");

(async () => {
  const data = await fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/", {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      cookie:
        "showImgs=imageson; _ym_uid=1666180386870676214; _ym_d=1666180386; BITRIX_SM_GUEST_ID=40837427; PHPSESSID=0YL5nTCZNiYoW5q0yibCd227I7w25124; BITRIX_SM_LAST_ADV=5_Y; smart_top=1; _ym_isad=2; _ym_visorc=w; color=; fontFamily=; fontSize=; letterSpace=; normalVer=normalversion; BITRIX_SM_LAST_VISIT=03.11.2022%2004%3A17%3A53",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
  });

  console.log(data);
})();
