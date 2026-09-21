# Sofra

İki kişilik, 14 günlük yemek planı. Bağımlılıksız HTML/CSS/JavaScript PWA.

## Çalıştırma

`python -m http.server 8080`

Tarayıcıda http://localhost:8080 adresini açın. Dosyayı doğrudan çift tıklamak servis çalışanını etkinleştirmez.

## GitHub Pages

Bu klasörün içeriğini ayrı bir deponun köküne yükleyin. Settings → Pages → Deploy from a branch → main / root seçin. Yayın HTTPS üzerinden açılır. Safari → Paylaş → Ana Ekrana Ekle.

## Veriler

Menü ve temsili SVG çizimleri yayınlanan dosyalardadır. Sağlık geçmişi, ilaçlar veya tahliller içermez. İsimler Ayarlar ekranında cihazda belirlenir. Takip localStorage'da tutulur; cihazlar arası senkronizasyon yoktur. JSON yedekleme / geri yükleme desteklenir.

Program mevcut menü taslağını aktarır. Eksik gramajlar tahmin edilmez. Akşam toplamları pişmiş ağırlıktır; alışveriş listesi tamamlanmış çiğ malzeme hesabı değildir. İkinci haftada eşleşen akşam yemekleri ilk haftanın porsiyonlarını kullanır.

Güncellemede sw.js içindeki CACHE sürümünü artırın. İlk başarılı çevrimiçi açılıştan sonra yerel menü çevrimdışı kullanılabilir.

## Kontrol

`node verify.cjs`
