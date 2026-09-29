# Instagram Nonfollowers

Instagram'da seni geri takip etmeyen kişileri bulan basit bir tarayıcı konsol scripti.
A simple browser console script that finds the people you follow who don't follow you back.

## Türkçe

### Ne yapar?
Takip ettiklerini ve takipçilerini çeker, karşılaştırır ve seni geri takip etmeyenleri listeler. Sonuçları konsolda tablo olarak gösterir, ekranda küçük bir panelde listeler ve kullanıcı adlarını panoya kopyalar. Otomatik takipten çıkarma yapmaz, hesabına hiçbir şey değiştirmez.

### Nasıl kullanılır?
1. Tarayıcıdan https://www.instagram.com adresini aç ve hesabına giriş yap.
2. F12 tuşuna basıp Console sekmesini aç.
3. `unfollower.js` dosyasındaki kodun tamamını kopyalayıp Console'a yapıştır ve Enter'a bas.
4. Chrome "allow pasting" yazmanı isterse yaz, kodu tekrar yapıştır.
5. Tarama bitene kadar sekmeyi açık ve önde tut. Çok takipçin varsa 10 dakikadan uzun sürebilir.
6. Sonuçlar ekranda çıkan panelde listelenir. Profile tıklayıp istediğin kişiyi elle takipten çıkarabilirsin.

### Uyarılar
1. Bu script Instagram'ın resmi olmayan iç API'sini kullanır. Kullanım tamamen senin sorumluluğundadır.
2. Instagram otomasyona karşı hesabı geçici olarak kısıtlayabilir. Arka arkaya çok sık çalıştırma.
3. Instagram sistemini değiştirirse script çalışmayabilir.
4. Bu proje Instagram veya Meta ile bağlantılı değildir.
5. Şifreni veya hesap bilgilerini kimseyle paylaşma. Script hiçbir veriyi dışarı göndermez, her şey tarayıcında çalışır.

## English

### What does it do?
It fetches the list of accounts you follow and your followers, compares them, and lists the people who don't follow you back. Results are shown as a table in the console, in a small on-screen panel, and the usernames are copied to your clipboard. It does not unfollow anyone automatically and changes nothing on your account.

### How to use
1. Open https://www.instagram.com in your browser and log in.
2. Press F12 and open the Console tab.
3. Copy the entire code from `unfollower.js`, paste it into the Console and press Enter.
4. If Chrome asks you to type "allow pasting", type it and paste again.
5. Keep the tab open and in the foreground until the scan finishes. It can take over 10 minutes for large accounts.
6. Results appear in the panel. Click a profile to unfollow the person manually.

### Disclaimer
1. This script uses Instagram's unofficial internal API. Use it at your own risk.
2. Instagram may temporarily restrict accounts that use automation. Don't run it repeatedly in a short time.
3. The script may stop working if Instagram changes its system.
4. This project is not affiliated with Instagram or Meta.
5. Never share your password or account details. The script sends no data anywhere, everything runs in your browser.

## License
MIT
