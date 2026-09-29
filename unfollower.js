(async () => {
  if (location.hostname !== "www.instagram.com") {
    return alert("Önce www.instagram.com sayfasını aç.");
  }

  const uid = document.cookie.match(/ds_user_id=(\d+)/)?.[1];
  if (!uid) return alert("Giriş yapılmamış görünüyor.");

  const headers = {
    "x-ig-app-id": "936619743392459",
    "x-requested-with": "XMLHttpRequest",
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rnd = (a, b) => a + Math.random() * (b - a);

  async function getList(kind) {
    const users = new Map();
    let cursor = "";
    let page = 0;

    while (true) {
      const url =
        `/api/v1/friendships/${uid}/${kind}/?count=50` +
        (cursor ? `&max_id=${encodeURIComponent(cursor)}` : "");

      const res = await fetch(url, { headers, credentials: "include" });
      const text = await res.text();

      if (!res.ok) {
        throw new Error(`${kind} isteği başarısız. Kod: ${res.status}. Cevap: ${text.slice(0, 200)}`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`${kind} cevabı JSON değil. Oturum düşmüş veya Instagram engellemiş olabilir.`);
      }

      if (!Array.isArray(data.users)) {
        throw new Error(`${kind} için beklenmeyen cevap: ${text.slice(0, 200)}`);
      }

      if (data.should_limit_list_of_followers || data.should_limit_list_of_followings) {
        throw new Error("Instagram bu listeyi kısıtlıyor, liste eksik gelir. Birkaç saat sonra tekrar dene.");
      }

      for (const u of data.users) {
        users.set(String(u.pk || u.id), {
          id: String(u.pk || u.id),
          username: u.username,
          name: u.full_name || "",
          verified: !!u.is_verified,
        });
      }

      page++;
      console.log(`${kind}: ${users.size} kişi yüklendi`);

      if (!data.next_max_id) break;
      cursor = String(data.next_max_id);

      await sleep(rnd(1200, 2600));
      if (page % 8 === 0) {
        console.log("Kısa mola veriliyor...");
        await sleep(rnd(8000, 12000));
      }
    }
    return users;
  }

  try {
    console.log("Takip ettiklerin çekiliyor...");
    const following = await getList("following");
    await sleep(3000);
    console.log("Takipçilerin çekiliyor...");
    const followers = await getList("followers");

    const result = [...following.values()]
      .filter((u) => !followers.has(u.id))
      .sort((a, b) => a.username.localeCompare(b.username));

    console.log(`Takip ettiğin: ${following.size}, takipçin: ${followers.size}`);
    console.log(`Seni geri takip etmeyen: ${result.length}`);
    console.table(result.map((u) => ({ kullanici: u.username, isim: u.name, onayli: u.verified })));

    try {
      await navigator.clipboard.writeText(result.map((u) => u.username).join("\n"));
      console.log("Kullanıcı adları panoya kopyalandı.");
    } catch {}

    // Basit sonuç paneli
    document.getElementById("nf-panel")?.remove();
    const panel = document.createElement("div");
    panel.id = "nf-panel";
    Object.assign(panel.style, {
      position: "fixed", top: "20px", right: "20px", width: "320px",
      maxHeight: "80vh", overflowY: "auto", background: "#111", color: "#fff",
      border: "1px solid #444", borderRadius: "12px", padding: "12px",
      zIndex: 2147483647, font: "14px system-ui, sans-serif",
    });

    const head = document.createElement("div");
    head.style.cssText = "display:flex;justify-content:space-between;margin-bottom:8px;font-weight:600";
    head.textContent = `Geri takip etmeyen: ${result.length}`;
    const close = document.createElement("button");
    close.textContent = "Kapat";
    close.onclick = () => panel.remove();
    head.appendChild(close);
    panel.appendChild(head);

    for (const u of result) {
      const a = document.createElement("a");
      a.href = `/${u.username}/`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "@" + u.username + (u.name ? "  " + u.name : "");
      a.style.cssText = "display:block;padding:5px 0;color:#7cc4ff;text-decoration:none";
      panel.appendChild(a);
    }
    document.body.appendChild(panel);
  } catch (err) {
    console.error("Hata:", err.message);
    alert("Hata: " + err.message);
  }
})();
