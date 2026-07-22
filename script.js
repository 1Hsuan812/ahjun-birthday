// 景點資料庫與 Google Maps 連結
const spotData = {
    reddot: {
        title: "RedDot 紅點文旅",
        icon: "🏨",
        time: "14:30~15:00 Check-in",
        desc: "辦理入住，享受復古溜滑梯飯店的獨特質感！",
        map: "https://maps.app.goo.gl/95vhS3aWZRiAQx1g7"
    },
    shenji: {
        title: "審計新村",
        icon: "📸",
        time: "16:00 逛逛散步",
        desc: "吃小點心 ⭐️最大任務「巨大人生四格貼」！",
        map: "https://maps.app.goo.gl/m6URhE4BaMX5Csfr6"
    },
    kongye: {
        title: "空也素麵食",
        icon: "🍜",
        time: "18:30 晚餐時間",
        desc: "日式禪風精緻素食麵點，好好享受美味晚餐！",
        map: "https://maps.app.goo.gl/P1smnzgC2qo9DFkB8"
    },
    tigercity: {
        title: "Tiger City",
        icon: "🛍️",
        time: "吃飽後 走走晃晃",
        desc: "逛街散步吃冰，享受台中的悠閒夜晚～",
        map: "https://maps.app.goo.gl/7pXFirF91KuoR1RC7"
    },
    nightmarket: {
        title: "中華夜市",
        icon: "🌙",
        time: "宵夜場",
        desc: "⭐️ 正和 VS 阿伯地瓜球大比拼！究竟誰會獲勝？",
        map: "https://maps.app.goo.gl/huFkaRfHVYeLLHC38"
    },
    comic: {
        title: "國家漫畫博物館",
        icon: "📚",
        time: "Day 2 - 11:30 左右",
        desc: "日式木造建築群散步，超好拍的漫畫博物館！",
        map: "https://maps.app.goo.gl/JLSyPn8ossSvbi5Q6"
    },
    uma: {
        title: "涮屋馬",
        icon: "🥩",
        time: "Day 2 - 13:30 生日大餐",
        desc: "🎂 阿君生日大餐！屋馬旗下的高級火鍋～",
        map: "https://maps.app.goo.gl/78MpiQzvY6taERqY6"
    },
    opera: {
        title: "臺中國家歌劇院",
        icon: "🎭",
        time: "Day 2 - 15:30~16:00 散步",
        desc: "吃飽出發歌劇院散步，欣賞伊東豊雄建築之美！",
        map: "https://maps.app.goo.gl/aYXtYDNbC5Edwsdg7"
    }
};

// 開啟 Apple 質感彈窗 Modal
function openModal(spotKey) {
    const data = spotData[spotKey];
    if (!data) return;

    document.getElementById('mIcon').innerText = data.icon;
    document.getElementById('mTitle').innerText = data.title;
    document.getElementById('mTime').innerText = data.time;
    document.getElementById('mDesc').innerText = data.desc;
    document.getElementById('mMapBtn').href = data.map;

    const modal = document.getElementById('modalBackdrop');
    modal.classList.add('active');
}

// 關閉 Modal
function closeModal(event) {
    if (event.target.id === 'modalBackdrop') {
        document.getElementById('modalBackdrop').classList.remove('active');
    }
}

function closeModalDirect() {
    document.getElementById('modalBackdrop').classList.remove('active');
}

// 🌸 產生柔和花瓣飄落動畫
function createPetals() {
    const container = document.getElementById('petal-container');
    const petalCount = 12;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // 隨機大小與位置
        const size = Math.random() * 8 + 8;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.3}px`;
        petal.style.left = `${Math.random() * 100}%`;
        
        // 隨機動畫時間
        const duration = Math.random() * 5 + 6;
        const delay = Math.random() * 5;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        container.appendChild(petal);
    }
}

// 打卡 CheckList (使用 LocalStorage)
function initChecklist() {
    const keys = Object.keys(spotData);
    keys.forEach(key => {
        const isChecked = localStorage.getItem(`spot_check_${key}`) === 'true';
        const checkbox = document.getElementById(`chk_${key}`);
        if (checkbox) {
            checkbox.checked = isChecked;
        }
    });
}

function toggleSpot(key) {
    const checkbox = document.getElementById(`chk_${key}`);
    if (checkbox) {
        localStorage.setItem(`spot_check_${key}`, checkbox.checked);
    }
}

// 原生分享功能 (Web Share API)
function shareTrip() {
    if (navigator.share) {
        navigator.share({
            title: '阿君生日遊 🎂 行程表',
            text: '快來看看阿君的生日行程與地圖景點！',
            url: window.location.href,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('行程網址已複製到剪貼簿，可以傳給好友囉！');
    }
}

// 初始化執行
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    initChecklist();
});
