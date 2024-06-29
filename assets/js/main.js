const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('#player-section')
const songList = $('.song-list')
const cd = $('.cd')
const cdThumb = $('.cd .cd-thumb')
const heading = $('#player-section .content .desc h2')
const singerTitle = $('#player-section .content .desc p')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const currentDuration = $('.time .start')
const leftDuration = $('.time .end')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const lyrics = $('#lyrics-section .lyrics')
const lyricsContent = $('#lyrics-section .lyrics-content')
const lyricsTools = $('#lyrics-section .tools')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    randomIndexArray: [],
    isRepeat: false,
    thumbAnimation: function thumbAnimation() {
        const cdThumbs = $$('.song-item .thumb')
        const thumbAnimation = cdThumbs[this.currentIndex].animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        console.log(thumbAnimation);
        return thumbAnimation
    },
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Đừng làm trái tim anh đau',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/dung-lam-trai-tim-anh-dau.mp3',
            image: './assets/img/dung-lam-trai-tim-anh-dau.jpg',
            lyrics: 'Hình như trong lòng anh đã không còn hình bóng ai ngoài em đâu <br>Hằng đêm anh nằm thao thức suy tư, chẳng nhớ ai ngoài em đâu<br>Vậy nên không cần nói nữa, yêu mà đòi nói trong vài ba câu<br>Cứ cố quá đâm ra lại hâm<br>Uhm, đau hết cả đầu<br><br>Đợi chờ em trước nhà từ sáng đến trưa chiều tối mắc màn đây luôn (ah-ah-ah-ah)<br>Ngược nắng hay là ngược gió, miễn anh thấy em tươi vui không buồn<br>Chỉ cần có thấy thế thôi mây xanh chan hoà<br>(Uhm) thấy thế thôi vui hơn có quà<br>Và bước kế tiếp anh lại gần hơn chút đó nha<br><br>Rồi ngày ấy cuối cùng đã tìm đến, ta nào đâu hay (hay)<br>Anh sẽ không để vụt mất đi cơ duyên ông trời trao tay<br>Còn đắn đo băn khoăn gì nữa, tiếp cận em ngay (ngay)<br>Cố gắng sao không để em nghi ngờ dù một giây lúc này<br><br>Được đứng bên em anh hạnh phúc, tim loạn nhịp tung bay (bay)<br>Chắc chắn anh thề anh sẽ không bao giờ quên ngày hôm nay<br>Chính em, chính em, tương tư mình em thôi<br>Mãi theo sau mình em thôi, mãi si mê mình em thôi<br>(Mãi yêu thương mình em)<br><br>Vậy thì anh xin chết vì người anh thương<br>Có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau<br><br>Vậy thì anh xin chết vì người anh thương<br>Nên có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau<br><br>Tình cờ lọt vào, nụ cười ngọt ngào (ngào)<br>Anh thề không biết đường thoát ra làm sao<br>Lựa một lời chào phải thật là ngầu nào (nào)<br>Nay tự dưng sao toàn mấy câu tào lao<br>Lại gần một chút cho anh ngắm nhìn người vài phút, say trong cơn mơ thiên đàng<br>Quên đi chuyện của nhân gian, hoà vào trăng sao, tan theo miên man<br><br>Nhiều lời rồi đấy nhé, dài dòng rồi đấy nhé<br>Rồi cứ thế, vòng lặp lại cứ thế<br>Lại bối rối, không xong là đến tối<br>Nói luôn đi, "Đời này chỉ cần mình em thôi"<br>Giấu hết nhớ nhung sâu trong lời nhạc, nối tiếp những áng thơ ngô nghê rời rạc<br>Viết lên chuyện đôi ta vào một ngày không xa, ngày về chung một nhà<br><br>Rồi ngày ấy cuối cùng đã tìm đến, ta nào đâu hay (hay)<br>Anh sẽ không để vụt mất đi cơ duyên ông trời trao tay<br>Còn đắn đo băn khoăn gì nữa, tiếp cận em ngay (ngay)<br>Cố gắng sao không để em nghi ngờ dù một giây lúc này<br><br>Được đứng bên em anh hạnh phúc, tim loạn nhịp tung bay (bay)<br>Chắc chắn anh thề anh sẽ không bao giờ quên ngày hôm nay<br>Chính em, chính em, tương tư mình em thôi<br>Mãi theo sau mình em thôi, mãi si mê mình em thôi<br>(Mãi yêu thương mình em)<br><br>Vậy thì anh xin chết vì người anh thương<br>Có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau<br><br>Vậy thì anh xin chết vì người anh thương<br>Nên có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau<br><br>Vậy thì anh xin chết vì người anh thương<br>Có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau<br><br>Vậy thì anh xin chết vì người anh thương<br>Có biết bao nhiêu điều còn đang vấn vương<br>Dành cho em, dành hết ân tình anh mang một đời<br>Đừng làm trái tim anh đau (ooh, hey)<br><br>La-la-la-la (hey), la-la-la-la-la-la-la<br>La-la-la-la (hey), la-la-la-la-la-la-la<br>La-la-la-la (okay), la-la-la-la-la-la-la<br>(Đừng làm trái tim anh đau)<br>One more time, one more time, one more time<br><br>La-la-la-la (hey), la-la-la-la-la-la-la<br>La-la-la-la (hey), la-la-la-la-la-la-la (Sơn Tùng M-TP)<br>La-la-la-la (yeah, oh), la-la-la-la-la-la-la<br>(Đừng làm trái tim anh đau)<br>'
        },
        {
            name: 'Xoay một vòng',
            singer: 'HIEUTHUHAI ft Phương Ly',
            path: './assets/music/Xoay-Mot-Vong-HIEUTHUHAI-Phuong-Ly.mp3',
            image: './assets/img/Xoay-Mot-Vong-HIEUTHUHAI-Phuong-Ly.jpg',
            lyrics: '[HOOK]<br>Khi mà ta bên nhau những vì sao phải rơi xuống ngay<br>Hôn lên môi em dịu êm như những đám mây<br>Đưa bàn tay lên cao mình sẽ đan lấy những ngón tay<br>Cứ thế ta xoay một vòng x2<br><br>[VERSE]<br>Là vào một đêm tối mình nằm chung gối (chung đôi)<br>nói anh sẽ không để em cô đơn<br>Luôn nghe theo con tim anh chỉ làm vì yêu không cần lời cảm ơn<br>hãy ghi xuống tất cả ước muốn<br>Quà tặng của anh có chắc có khi hơn<br>Omega cho em cả thời gian của anh<br>sẽ là những, những kí ức mà ta chẳng thể quên<br>Giờ anh đã nghĩ, nghĩ tới lúc mình ngồi đặt tên<br>sẽ trực tiếp xuống nước để em ở trên<br>từ ngày gặp nhau có lý do để anh phải thay hình nền<br>mọi thứ vì em<br>anh sẽ khiến tất cả phụ nữ phải đều ghen chỉ đơn giản vì họ không phải là em<br>từ giờ nhìn trời anh cũng không phải nhìn lên<br>mỗi khi muốn ngắm sao anh đâu chờ tới màn đêm<br>khi yêu anh em quên đi âu lo<br>lonely girl you cant feel it no more<br>đặt điện thoại trước mặt khi em ngủ<br>hơn 8 tiếng khi ta video call<br><br>[HOOK]<br>Khi mà ta bên nhau những vì sao phải rơi xuống ngay<br>Hôn lên môi em dịu êm như những đám mây<br>Đưa bàn tay lên cao mình sẽ đan lấy những ngón tay<br>Cứ thế ta xoay một vòng x2<br><br>PHƯƠNG LY VERSE<br>Ngàn vì sao dẫn lối đưa em đi về phía anh, tìm thấy anh giữa thời-không này<br>Một vòng quanh thế giới chẳng nơi đâu bằng được cảm giác bên anh ngay ở đây<br>Định mệnh này dường như đã sắp đặt..<br>Sắp đặt một nụ hôn lên môi<br>Nụ cười thơm mát sát gần<br>Sáng lên giữa màn đêm tối<br>Là vì sao rơi hay là em rơi vào tình yêu với anh..<br>Chỉ mong dài lâu with you!!'
        },
        {
            name: 'Chúng ta của tương lai',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/Chung-Ta-Cua-Tuong-Lai-Son-Tung-MTP.mp3',
            image: './assets/img/Chung-Ta-Cua-Tuong-Lai-Son-Tung-MTP.jpg',
            lyrics: 'Liệu mai sau phai vội mau không bước bên cạnh nhau (bên cạnh nhau)<br>Thì ta có đau? (Thì ta có đau? Có đau?)<br>Đôi mi nhòe phai ai sẽ lau?<br>Ai sẽ đến lau nỗi đau này?<br>Vô tâm quay lưng ta thờ ơ, lạnh lùng băng giá như vậy sao? (Vậy sao? Vậy sao?)<br>Vờ không biết nhau (không biết nhau, không biết nhau)<br>Lặng im băng qua chẳng nói một lời (chẳng nói một lời)<br>Ooh-whoa-ooh-whoa-oh-oh-oh (yeah, eh)<br>Rồi niềm đau có chóng quên? (Hah-ah-ooh-ah)<br>Hay càng quên càng nhớ thêm, vấn vương vết thương lòng xót xa?<br>Đừng như con nít (con nít), từng mặn nồng say đắm say (oh-oh-ah)<br>Cớ sao khi chia tay (chia tay), ta xa lạ đến kì lạ? (Ta xa lạ đến kì lạ)<br>Ai dám nói trước sau này (trước sau này)<br>Chẳng ai biết trước tương lai sau này (sau này)<br>Tình yêu đâu biết mai này có vẹn nguyên<br>Còn nguyên như lời ta đã hứa trước đây? (Ta đã hứa trước đây)<br>Dẫu cho giông tố xô xa rời (xa rời)<br>Còn mãi những điều đẹp đẽ say đắm một thời (một thời)<br>Nụ cười và giọt nước mắt rơi từng trao cùng ta<br>Nhìn lại về phía mặt trời (phía mặt trời)<br>Ta về phía mặt trời (phía mặt trời)<br>Yah, yah<br>Tương lai ngày mai ai nào hay (whoa)<br>Yêu thương rồi buông đôi bàn tay (whoa)<br>Mong manh đường duyên như vận may<br>Chia ly, hợp tan nhanh còn hơn mây trời bay (yah)<br>Quên nhau, vờ như chưa từng quen (sao quên?)<br>Quên luôn mặt, quên luôn cả tên (sao quên?)<br>Quên đi, làm sao mà đòi quên?<br>Khi câu thề xưa vẫn vẹn nguyên nên đừng cố quên (ah)<br>Vấn vương cũng chẳng sao mà (whoa), nhớ nhung cũng chẳng sao mà (whoa)<br>Đớn đau cũng chẳng sao mà (whoa)<br>Dù có đắng cay ta cũng chẳng sao đâu<br>Chân thành khi còn bên nhau và trân trọng hơn mỗi phút giây (hơn mỗi phút giây)<br>Thành thật bên nhau mỗi phút giây (yeah, yeah)<br>Rồi niềm đau có chóng quên? (Hah-ah-ooh-ah)<br>Hay càng quên càng nhớ thêm, vấn vương vết thương lòng xót xa? (Whoa-oh-oh-oh-oh-oh-oh)<br>Đừng như con nít (con nít), từng mặn nồng say đắm say (oh-oh-ah)<br>Cớ sao khi chia tay (chia tay), ta xa lạ đến kì lạ? (Ta xa lạ đến kì lạ, hah)<br>Ai dám nói trước sau này (trước sau này)<br>Chẳng ai biết trước tương lai sau này (sau này)<br>Tình yêu đâu biết mai này có vẹn nguyên<br>Còn nguyên như lời ta đã hứa trước đây? (Ta đã hứa trước đây)<br>Dẫu cho giông tố xô xa rời (xa rời)<br>Còn mãi những điều đẹp đẽ say đắm một thời (một thời)<br>Nụ cười và giọt nước mắt rơi từng trao cùng ta<br>Nhìn lại về phía mặt trời<br>Ai dám nói trước sau này<br>Chẳng ai biết trước tương lai (trước tương lai, trước tương lai)<br>Tình yêu đâu biết mai này có vẹn nguyên như lời ta đã hứa trước đây?<br>Dẫu cho giông tố xô xa rời<br>Dù cho bão giông chia lìa ta (dù cho bão giông chia lìa ta)<br>Nụ cười và giọt nước mắt rơi<br>Để trao tặng em một cơn mơ, y-yah, y-yah (y-yah, y-yah, hah)<br>Ai dám nói trước sau này (sống bên nhau mà)<br>Chẳng ai biết trước tương lai sau này (sống bên nhau mà)<br>Tình yêu đâu biết mai này có vẹn nguyên<br>Còn nguyên như lời ta đã hứa trước đây? (Ta đã hứa trước đây)<br>Dẫu cho giông tố xô xa rời (giữ yêu thương kia)<br>Còn mãi những điều đẹp đẽ say đắm một thời (giữ yêu thương kia)<br>Nụ cười và giọt nước mắt rơi từng trao cùng ta<br>Nhìn lại về phía mặt trời (mặt trời)<br>Ta về phía mặt trời (phía mặt trời, phía mặt trời, phía mặt trời)'
        },
        {
            name: 'Dân chơi sao phải khóc',
            singer: 'Andree Right Hand ft Rhyder',
            path: './assets/music/Dan-Choi-Sao-Phai-Khoc-Andree-Right-Hand-RHYDER.mp3',
            image: './assets/img/Dan-Choi-Sao-Phai-Khoc-Andree-Right-Hand-RHYDER.jpg',
            lyrics: 'Yea…. Huh….yea…<br>Lại là DG House<br>DaMoneyTeam<br>Rhyder<br><br>Baby<br>Con tim anh đây em cứ đến mà lấy đi<br>Qua đêm nay xem như hai ta chẳng biết gì<br>Đừng cứ khiến anh loay hoay mắc kẹt mãi ở trong vòng xoáy kia<br>Okey đưa anh bút với cả tập giấy đi<br>All night oh baby, you make me so crazy<br>Và anh rất tiếc đến lúc nên dừng lại<br>Oh baby, please don’t cry<br>Có lẽ đã đến lúc, bây giờ anh phải đi<br>Anh phải đi yea…<br>Còn cả đống công việc phải lo<br>Sorry bae chẳng thể cạnh nhau<br>Để lại những yêu thương đổ vỡ<br>Cơn mưa kia vẫn chưa tạnh đâu<br>Và nên cầu vồng vẫn núp sau màn mưa<br>Và anh nhận ra càng níu lại càng thua<br><br>Dân chơi thì sao phải khóc<br>Đống job còn chưa làm xong<br>Đừng cứ coi anh như là thằng ngốc<br>Rót đầy ly rồi anh lại nốc<br>Dân chơi thì sao phải khóc<br>Thì mới xứng đáng là thằng đàn ông<br>Đừng cứ coi anh như là thằng ngốc<br>Rót đầy ly rồi anh lại nốc<br>Dân chơi thì sao phải khóc<br><br>Baby dont cry<br>Baby dont cry<br>Baby dont cry<br>Yaaa…Sao phải khóc<br>Yaaa…Sao phải khóc<br>Yaaa…Sao phải khóc<br><br>Andree got a bang, no cap<br>Baby em đã biết Andree Right Hand, anh không thể khóc<br>Gotta keep it real, đừng cho anh vai diễn anh không thể đóng<br>Iced out on my neck, giữ cho đầu anh không bị nóng<br>Tìm cho mình 1 lối đi riêng, không cho phép bản thân nằm trong hệ thống<br>Anh lái trap, đưa mấy thằng em này lên bệ phóng<br>Cách anh rap, chúng nó cố fake những không thể giống<br>Mấy em gái như em vẫn còn đang xếp hàng ra cả đống<br>Họ nói với anh vốn dĩ mình dành cho nhau anh thấy chả giống<br>Rolls Royce umbrella bật nó lên khi trời mưa<br>Cartier nhẫn kim cương thay cho những lời hứa<br>Thoát khỏi cảnh xấu anh không thể yêu em lần nữa<br>Trái tim cũng lấy đi, nhường cho em luôn được chưa<br>Chuyển làn đạp ga, anh né khỏi những nơi xô bồ<br>Em hỏi còn yêu em không, baby rất tiếc là no no<br>Vài lời rèm pha, cũng đếch có gì phải lo sợ<br>Vì nước mắt không thể rơi, now just leave me alone yea…<br><br>Và anh rất tiếc đến lúc nên dừng lại<br>Oh baby, please don’t cry<br>Có lẽ đã đến lúc, bây giờ anh phải đi<br>Anh phải đi yea…<br>Còn cả đống công việc phải lo<br>Sorry bae chẳng thể cạnh nhau<br>Để lại những yêu thương đổ vỡ<br>Cơn mưa kia vẫn chưa tạnh đâu<br>Và nên cầu vồng vẫn núp sau màn mưa<br>Và anh nhận ra càng níu lại càng thua<br><br>Dân chơi thì sao phải khóc<br>Đống job còn chưa làm xong<br>Đừng cứ coi anh như là thằng ngốc<br>Rót đầy ly rồi anh lại nốc<br>Dân chơi thì sao phải khóc<br>Thì mới xứng đáng là thằng đàn ông<br>Đừng cứ coi anh như là thằng ngốc<br>Rót đầy ly rồi anh lại nốc<br>Dân chơi thì sao phải khóc<br><br>WOKEUP…'
        },
        {
            name: 'My Humps',
            singer: 'The black eyed peas',
            path: './assets/music/The-Black-Eyed-Peas-Remix-My-Humps.mp3',
            image: './assets/img/The-Black-Eyed-Peas-Remix-My-Humps.jpg',
            lyrics: "What you gon' do with all that junk?<br>All that junk inside your trunk?<br>I'ma get, get, get, get, you drunk<br>Get you love drunk off my hump<br>My hump, my hump, my hump, my hump, my hump,<br>My hump, my hump, my hump, my lovely little lumps. (Check it out)<br><br>I drive these scrubbers crazy<br>I do it on the daily<br>They treat me really nicely<br>They buy me all these ice-ys<br>Dolce & Gabbana<br>Fendi and then Donna<br>Karen, they be sharin'<br>All their money got me wearin'<br>Fly gearrr but I ain't askin',<br>They say they love my ass ?n,<br>Se7en Jeans, True Religion,<br>I say no, but they keep givin'<br>So I keep on takin'<br>And no I ain't fakin'<br>We can keep on datin'<br>I keep on demonstrating<br><br>My love, my love, my love, my love<br>You love my lady lumps<br>My hump, my hump, my hump<br>My humps they got you<br>She?s got me spending<br>(Oh) Spendin' all your money on me and spending time on me<br>She?s got me spendin'<br>(Oh) Spendin' all your money on me, on me, on me<br><br>What you gon do with all that junk?<br>All that junk inside that trunk<br>I'ma get, get, get, get, you drunk<br>Get you love drunk off my hump<br>What you gon' do with all that ass?<br>All that ass inside them jeans<br>I'm a make, make, make, make you scream<br>Make you scream, make you scream<br>'Cause of my hump, my hump, my hump, my hump<br>My hump, my hump, my hump, my lovely lady lumps (Check it out)<br><br>I met a girl down at the disco<br>She said hey, hey, hey yea let's go<br>I could be your baby, you can be my honey<br>Lets spend time not money<br>I mix your milk wit my cocoa puff<br>Milky, milky cocoa<br>Mix your milk with my cocoa puff, milky, milky riiiight<br><br>They say I'm really sexy<br>The boys they want to sex me<br>They always standing next to me<br>Always dancing next to me<br>Tryin' a feel my hump, hump<br>Lookin' at my lump, lump<br>you can look but you can't touch it<br>If you touch it I'ma start some drama<br>You don't want no drama<br>No, no drama, no, no, no, no drama<br>So don't pull on my hand boy<br>You ain't my man, boy<br>I'm just tryn'a dance boy<br>And move my hump<br><br>My hump, my hump, my hump, my hump<br>My hump, my hump, my hump, my hump, my hump, my hump<br>My lovely lady lumps x3<br>In the back and in the front<br>My lovin' got you<br>She's got me spendin'<br>(Oh) Spendin' all your money on me and spending time on me<br>She's got me spendin'<br>(Oh) Spendin' all your money on me, on me, on me<br><br>What you gon' do with all that junk?<br>All that junk inside that trunk<br>I'ma get, get, get, get you drunk<br>Get you love drunk off my hump<br>What you gon' do with all that ass?<br>All that ass inside them jeans?<br>I'ma make, make, make, make you scream<br>Make you scream, make you scream<br>What you gon' do with all that junk?<br>All that junk inside that trunk<br>I?ma get, get, get, get you drunk<br>Get you love drunk off this hump<br>What you gon' do wit all that breast?<br>All that breast inside that shirt<br>I'ma make, make, make, make you work<br>Make you work, work, make you work<br>She's got me spendin'<br>Spendin' all your money on me and spendin' time on me<br>She's got me spendin'<br>Spendin' all your money on me, on me, on me"
        },
        {
            name: 'Die for you',
            singer: 'The Weekends ft Ariana Grande',
            path: './assets/music/Die-For-You-Remix-The-Weeknd-x-Ariana-Grande.mp3',
            image: './assets/img/Die-For-You-Remix-The-Weeknd-x-Ariana-Grande.jpg',
            lyrics: "I'm findin' ways to articulate the feeling I'm goin' through<br>I just can't say I don't love you (yeah)<br>'Cause I love you, yeah<br>It's hard for me to communicate the thoughts that I hold<br>But tonight, I'm gon' let you know<br>Let me tell the truth<br>Baby, let me tell the truth, yeah<br>You know what I'm thinkin', see it in your eyes<br>You hate that you want me, hate it when you cry<br>You're scared to be lonely, especially in the night<br>I'm scared that I'll miss you, happens every time<br>I don't want this feelin', I can't afford love<br>I try to find a reason to pull us apart<br>It ain't workin' 'cause you're perfect<br>And I know that you're worth it<br>I can't walk away, (oh)<br>Even though we're going through it<br>And it makes you feel alone<br>Just know that I would die for you<br>Baby, I would die for you, yeah<br>The distance and the time between us<br>It'll never change my mind<br>'Cause baby, I would die for you<br>Baby, I would die for you, yeah<br>I'm finding ways to manipulate the feelin' you're going through<br>But baby-girl, I'm not blaming you<br>Just don't blame me too, yeah<br>'Cause I can't take this pain forever<br>And you won't find no one that's better<br>'Cause I'm right for you, babe<br>I think I'm right for you, babe<br>You know what I'm thinking, see it in your eyes<br>You hate that you want me, hate it when you cry<br>It ain't workin' 'cause you're perfect<br>And I know that you're worth it<br>I can't walk away<br>Even though we're going through it<br>And it makes you feel alone<br>Just know that I would die for you<br>Baby, I would die for you, yeah<br>The distance and the time between us<br>It'll never change my mind<br>'Cause baby, I would die for you<br>Baby, I would die for you, yeah<br>I would die for you, I would lie for you<br>Keep it real with you, I would kill for you, my baby<br>I'm just sayin', yeah<br>I would die for you, I would lie for you<br>Keep it real with you, I would kill for you, my baby<br>Na, na, na, na, na, na, na, na<br>Even though we're going through it<br>And it makes you feel alone<br>Just know that I would die for you<br>Baby, I would die for you, yeah<br>The distance and the time between us<br>It'll never change my mind<br>'Cause baby, I would die for you<br>Baby, I would die for you, yeah<br>Die for you"
        },
        {
            name: 'Dance the night',
            singer: 'Dua Lipa',
            path: './assets/music/Dance-The-Night-Dua-Lipa.mp3',
            image: './assets/img/Dance-The-Night-Dua-Lipa.jpg',
            lyrics: "Baby, you can find me under the lights<br>Diamonds under my eyes<br>Turn the rhythm up, don't you wanna just<br>Come along for the ride?<br>Ooh, my outfit so tight<br>You can see my heartbeat tonight<br>I can take the heat, baby, best believe<br>That's the moment I shine<br><br>'Cause every romance shakes and it bends<br>Don't give a damn<br>When the night's here, I don't do tears<br>Baby, no chance<br><br>I could dance, I could dance, I could dance<br><br>Watch me dance, dance the night away<br>My heart could be burnin', but you won't see it on my face<br>Watch me dance, dance the night away (uh-huh)<br>I'll still keep the party runnin', not one hair out of place<br><br>Lately, I've been movin' close to the edge<br>Still be lookin' my best<br>I stay on the beat, you can count on me<br>I ain't missin' no steps<br><br>'Cause every romance shakes and it bends<br>Don't give a damn<br>When the night's here, I don't do tears<br>Baby, no chance<br><br>I could dance, I could dance, I could dance<br><br>Watch me dance, dance the night away<br>My heart could be burnin', but you won't see it on my face<br>Watch me dance (dance), dance the night away (uh-huh)<br>I'll still keep the party runnin', not one hair out of place<br><br>When my heart breaks (they never see it, never see it)<br>When my world shakes (I feel alive, I feel alive)<br>I don't play it safe (ooh), don't you know about me? (Uh-huh)<br>I could dance, I could dance, I could dance<br><br>Even when the tears are flowin', they're diamonds on my face<br>I'll still keep the party goin', not one hair out of place (yes, I can)<br>Even when the tears are flowin', they're diamonds on my face (yes, I can, yes, I can)<br>I'll still keep the party goin', not one hair out of place<br><br>Watch me dance, dance the night away (uh-huh)<br>My heart could be burnin', but you won't see it on my face<br>Watch me (dance) dance, dance the night away (uh-huh)<br>I'll still keep the party runnin', not one hair out of place<br><br>When my heart breaks (they never see it, never see it)<br>When my world shakes (I feel alive, I feel alive)<br>I don't play it safe, don't you know about me? (Uh-huh)<br>I could dance, I could dance, I could dance<br><br>Dance the night"
        },
        {
            name: 'Vụ nổ lớn - Không quan trọng',
            singer: 'MCK ft Justatee',
            path: './assets/music/Vu-No-Lon-Khong-Quan-Trong-MCK-Justatee.mp3',
            image: './assets/img/Vu-No-Lon-Khong-Quan-Trong-MCK-Justatee.jpg',
            lyrics: "MCK, 2024<br>Yeah em call anh là con c-, I'll stay real<br>Nếu em đã bước đi, em phải bước đi rồi<br>You gotta go<br>Yeah<br><br>[Verse 1: MCK, Tage & Both]<br><br>Anh nghĩ rằng ta chẳng nên bên nhau nữa đâu<br>Anh phải ra đi cho dù anh đã yêu rất đậm sâu<br>Em yêu, tay em bóp con tim anh quá đau<br>Ngày trôi thật lâu và hàng cây thì cũng mới thay màu<br>Anh không tin, tất cả cũng chỉ là lí do<br>Cho một ai khác thôi, cho một ai khác thôi<br>Không phải anh!<br>Ngay trong iPhone anh là bao nhiêu kỷ niệm về nàng xuyên qua tim anh như cung tên<br>Bao nhiêu ngày qua anh vẫn không thể nào tin là<br>Em lại không thể làm điện thoại anh rung lên (quá là cay)<br>Vinahouse không thể giúp anh hết đi overthinking về em, nó đã ám anh từng đêm (whoa)<br>Làm đôi mắt anh lại chùng thêm<br>Ta nằm trong album của Wren, tên là 'Từng Quen'<br>Chẳng thể nào đốt hết tận sâu trong đôi mắt đâu<br>Sao bao nhiêu lâu nay anh không thể chạm vào?<br>Bởi vì chẳng phải là em cố giấu đi ngay từ khi ta bắt đầu<br>Baby tell me right now<br>Bởi vì nếu mà không còn yêu, anh sẽ quay đi chấp nhận<br>Nhưng mà chưa từng yêu<br>Điều gì làm anh vướng bận à?<br>Mưa chậm rơi, ngay trên khuôn mặt à?<br>Môi chạm môi, đôi tay buông dần<br><br>[Chorus: JustaTee]<br><br>Vậy giờ người đừng tìm lại anh, nơi ai khác không phải anh<br>Chẳng thể nào bận tâm, tim anh mãi luôn chân thành<br>Liệu rằng lời xin lỗi đó có khiến ta còn như lúc đầu?<br>Từng câu hát đã cố viết thêm những chương sau<br>Giờ này nhìn về nhau nơi ấy còn đâu?<br>Nụ cười em trên môi thay cho nỗi đau anh nơi này<br>Màu trời em xanh mãi mỗi anh là mù mây<br>Cứ như vậy đi<br>Sóng đâu cản được gió mang thuyền xa<br><br>[Refrain: MCK]<br><br>Oh my love<br>Don't cry cry<br>Oh my love<br>Say goodbye<br><br>[Verse 2: Orijin]<br><br>Okay, nếu thế, xin em cứ bước tiếp, đâu cần ngoái lại đằng sau<br>Đốt hết đi bao nhiêu ký ức, hãy xem như ta chưa thấy nhau<br>Chắc có lẽ em chơi anh như trò chơi, nhưng mà con tim anh cũng biết đau<br>Nỗi nhớ về em bỏ lại phía sau<br>Hãy cứ coi như ta chưa bao giờ bắt đầu<br><br>[Verse 3: MCK & Tage]<br><br>Và anh nhận ra như là không thể quên được em<br>Khi mắt anh đã khép lại khi không gian đã tối đen<br>Mấy thằng homies anh đều khuyên anh là anh nên quên đi<br>Chúng nó không biết giọt nước mắt của anh vẫn đang lăn trên mi<br>Anh không chắc rằng bản thân mình có thể vượt qua được khi em không gần kề<br>Vượt qua được cơn mưa giông tràn về<br>Một người từng ngày từng ngày chờ đợi một người<br>Nụ cười xưa em trao tôi để tôi tô lên đôi môi<br><br>[Chorus: JustaTee]<br><br>Vậy giờ người đừng tìm lại anh, nơi ai khác không phải anh<br>Chẳng thể nào bận tâm, tim anh mãi luôn chân thành<br>Liệu rằng lời xin lỗi đó có khiến ta còn như lúc đầu?<br>Từng câu hát đã cố viết thêm những chương sau<br>Giờ này nhìn về nhau nơi ấy còn đâu?<br>Nụ cười em trên môi thay cho nỗi đau anh nơi này<br>Màu trời em xanh mãi mỗi anh là mù mây<br>Cứ như vậy đi<br>Sóng đâu cản được gió mang thuyền xa<br><br>[Bridge: Trung Trần with JustaTee]<br><br>Có lẽ em cứ bước tiếp đi em ơi<br>Em đâu cần bận tâm<br>Đừng làm anh đau thêm, nó giết anh từng đêm<br>Khi em trong tay người, tâm trí anh sắp quay cuồng<br>Giọt lệ nào hay chợt buông, yeah<br>Khi anh ôm chặt lấy nơi lạnh băng đang dần xa nơi này<br>Còn gì đây? Còn gì đây? Còn gì đây?<br>Còn gì? Còn gì?<br><br>[Chorus: JustaTee]<br><br>Vậy giờ người đừng tìm lại anh, nơi ai khác không phải anh<br>Chẳng thể nào bận tâm, tim anh mãi luôn chân thành<br>Liệu rằng lời xin lỗi đó có khiến ta còn như lúc đầu?<br>Từng câu hát đã cố viết thêm những chương sau<br>Giờ này nhìn về nhau nơi ấy còn đâu?<br>Nụ cười em trên môi thay cho nỗi đau anh nơi này<br>Màu trời em xanh mãi mỗi anh là mù mây<br>Cứ như vậy đi<br>Sóng đâu cản được gió mang thuyền xa<br><br>[Outro: MCK]<br><br>Oh my girl<br>Don't cry cry<br>You're my all<br>Say goodbye, bye<br>You're my hеart<br>Don't lie lie<br>My girl<br>Say goodbye"
        },
        {
            name: 'Everything will be okay',
            singer: 'HIEUTHUHAI',
            path: './assets/music/Everything-Will-Be-Okay-HIEUTHUHAI.mp3',
            image: './assets/img/Everything-Will-Be-Okay-HIEUTHUHAI.jpg',
            lyrics: "No matter the pain I cause you<br>I know your love remains the same<br>You'll be fine without me<br>Don't think that I could say the same<br>No matter the pain I cause you<br>I know your love remains the same<br>Know you'll be fine without me<br>Don't know if I could say the same<br>Đôi khi tao hay nhắm mắt và nghĩ về những thứ xung quanh<br>Những kí ức tao đã đi qua và những vết thương cần được chữa lành<br>Những tối ghế đá nằm ngoài đêm lạnh<br>Và tao tự hào về hết tất cả mà con người tao bây giờ trở thành<br>Bên cạnh thằng Hiếu vui vẻ ngày xưa giờ là thằng Hiếu rất hay phát bực<br>Luôn luôn tự hỏi Đã đủ đầy chưa?, đôi khi khó thở bởi những áp lực<br>Nhưng mỗi lần nhìn vào gia đình không bao giờ thiếu một thứ gì<br>Thì tao biết là mình đi đúng đường và không chấp nhận mình thứ nhì<br>Tao có nhiều fan, tới show mỗi tháng<br>Chỉ vì có một bức hình mà chấp nhận đứng để tới trời sáng<br>Cảm ơn tao nhiều rất nhiều vì dòng lyrics giúp họ phải ráng<br>Và có thể hét to, đọc theo từng chữ làm tao chẳng muốn rời quán<br>Mà ngờ nhóc con ngày đó đứng ngã tư để phát tờ rơi<br>Có một tâm hồn trong vắt nhưng nhiều clo giống như hồ bơi<br>Giờ thì đứng ở trên sân khấu, bài nhạc vang hết khắp vùng trời<br>Và được gọi là một sao, có nhiều người trân quý trong cuộc đời<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-okay<br>Everything will be o-okay<br>Bức tranh cuộc đời tao vẽ cùng đã được đầy màu, ay<br>Vẫn còn những màu đen trắng của mấy anh em tao từ những ngày đầu, ay<br>Ở đó hết những ngày sầu và đã đi chung với nhau thật lâu<br>Và vài câu nói tao vẫn không quên, \"Nếu mai sau lỡ có thằng này giàu\"<br>\"Sẽ đi từng nhà và hú, khoang thương gia và nhiều kì thú\"<br>Giữ lấy một lời thề là biến đám nerd này thành một bầy tỉ phú, ah<br>Người ta nói mày giàu làm gì khi gia đình mày thì không?<br>Người ta nói mày giàu làm gì khi gia đình mày thì không?<br>Từ cố gắng lắp đầy được hết tủ đông<br>Giờ cũng không biết album đứng đầu vầy thì có đủ không?<br>Nhắm chặt mi cho qua ngày mai, ay, and you will be fine, ay<br>Cho bản thân vài giây khi đã thu mình trong stu- many nights, ay<br>Khi mà ta chưa lớn, ta quên nhìn quanh, toàn nghĩ về sau này<br>Già đi, chỉ còn nhìn quá khứ khi những hạt cát thời gian đã mau đầy<br>Chẳng biết tương lai sẽ tốt hơn hay là còn gì trong tay?<br>Chỉ muốn nói \"biết ơn\", tao sẽ nhớ nhiều về ngày hôm nay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-o-okay<br>Everything will be o-okay<br>Everything will be o-okay<br>No matter the pain I cause you<br>I know your love remains the same<br>Knew you'll be fine without me<br>Don't think that I could say the same<br>No matter the pain I cause you<br>I know your love remains the same<br>Know you'll be fine without me<br>Don't know if I could say the same"
        },
        {
            name: 'BAND4BAND',
            singer: 'Central Cee ft. Lil Baby',
            path: './assets/music/Central-Cee-BAND4BAND-Ft.-Lil-Baby.mp3',
            image: './assets/img/Central_Cee_ft_Lil_Baby_-_BAND4BAND.jpg',
            lyrics: "I'm not in the mood 'cause my flight delayed<br>So I jumped on a private jet and I'm askin' the pilot the ETA<br>Lambo' parked on the landin' strip, everyone in my gang and my DJ paid<br>Why's my man talkin' 'bout Insha'Allah? These times, he don't even pray<br>verse<br>Why's my man wearin' a Jesus piece? How does she squeeze in 'em jeans?<br>Big behind and petitest waist, take time with the GBG, we don't beef nobody like GBK<br>Woke up on the wrong side of bed, so he's gonna get slapped if I don't have my P's today<br>I love my young boy, I won't lead him 'stray, I'm stuck to lil' bro like PVA<br>verse<br>Paid already, I don't need no hit song<br>We don't need ID, lil' bro 17 in the club, he ain't scrollin' TikTok<br>F's just saw him a thick one, \"Which one? Who do you want, bro? Pick one\"<br>If I shoot my shot, I'll hit one, matter of time 'til I get them all ticked off, alright<br>chorus<br>We can go band for band, fuck that, we can go M for M<br>Quarter mil' for the Maybach truck, double R with the factory rims<br>I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat<br>It's got to the point that I don't even care, I got jewels in the safe that I don't even wear<br>verse<br>Uh, bro'll do it for some shoes and some clothes, you'll see what he'll do for a necklace<br>'Rari truck, it look like a spider, it's crawlin' a dollar on just accessories (damn)<br>She made me wanna go harder, I like her whole aura, I think I'm obsessed with her<br>They hit him up on his birthday, did him the worst way, he had a death wish<br>verse<br>I get right under they skin, I don't even try, I guess I can't help that shit<br>I'ma have love for bro for life if we talk or not, I step with 'em<br>Of course you can beat me at talkin', ain't no back and forth, wait 'til we catch up with him<br>Knockin' a bag and makin' the opposite mad, I done fell in love with it<br>verse<br>UK Selfridges with a cute one (ooh), bank account look good, this a new one (yeah)<br>You the type like to type on computers (wow), got a mask, but he ain't no shooter (haha)<br>Top ten, but she don't act bougie, me and your friends can go to Aruba<br>Hit France, it depend on my mood, this a Maybach Benz, this ain't no Uber<br>verse<br>We can go band for band, fuck that, we can go M for M<br>Mama got a body like Kim and 'em, mama been killin' that gym<br>We can go watch for watch, from chain to chain, the rings, I'm him<br>I done got rich, but I'm still with the shit, land in London and go to the ends<br>chorus<br>We can go band for band, fuck that, we can go M for M<br>Quarter mil' for the Maybach truck, double R with the factory rims<br>I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat<br>It's got to the point that I don't even care, I got jewels in the safe that I don't even wear"
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this

        // Xoay CD thumb
        var currentAnimation = this.thumbAnimation()
        currentAnimation.pause()
        // function handlePauseAnimation () {
        //     currentAnimation.pause()
        //     currentAnimation = _this.thumbAnimation()
        //     return currentAnimation
        // }
        function handleRemoveAnimation () {
            currentAnimation.cancel()
            currentAnimation = _this.thumbAnimation()
            return currentAnimation
        }

        // Xử lý CD phóng to / thu nhỏ
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play 
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                handleRemoveAnimation().play()
                audio.pause()
            } else {
                handleRemoveAnimation().cancel()
                audio.play()
            }
        }

        // Khi bài hát play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            handleRemoveAnimation().play()
        }

        // Khi bài hát pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            handleRemoveAnimation().cancel()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                updateUI()
            }
        }

        // Khi tua bài
        progress.oninput = function (e) {
            // const seekTimes = e.target.value * audio.duration
            audio.currentTime = e.target.value
        }

        audio.onloadedmetadata = function () {
            audio.currentTime = 0
            updateUI()
        }

        function updateUI() {
            progress.value = Math.floor(audio.currentTime);
            progress.max = Math.floor(audio.duration);

            let secondCurrent = Math.floor(audio.currentTime) % 60;
            let minuteCurrent = Math.floor(Math.floor(audio.currentTime) / 60);
            let secondLeft = (Math.floor(audio.duration) - Math.floor(audio.currentTime)) % 60;
            let minuteLeft = Math.floor((Math.floor(audio.duration) - Math.floor(audio.currentTime)) / 60);

            let current, left;

            current = secondCurrent < 10 ? `${minuteCurrent}:0${secondCurrent}` : `${minuteCurrent}:${secondCurrent}`;
            left = secondLeft < 10 ? `-${minuteLeft}:0${secondLeft}` : `-${minuteLeft}:${secondLeft}`;

            currentDuration.innerText = current;
            leftDuration.innerText = left;
            progress.style.background = `linear-gradient(to right, var(--primary-color) ${progress.value / progress.max * 100}%, #4d4d4d ${progress.value / progress.max * 100}%)`;
        }

        // Khi next bài
        nextBtn.onclick = function () {
            if (_this.isRandom)
                _this.playRandomSong()
            else
                _this.nextSong()
            audio.play()
            handleRemoveAnimation().play()
        }

        // Khi next bài
        prevBtn.onclick = function () {
            if (_this.isRandom)
                _this.playRandomSong()
            else
                _this.prevSong()
            audio.play()
            handleRemoveAnimation().play()
        }

        // Khi random bài
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Khi repeat bài
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Khi kết thúc bài
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Khi click vào bài
        songList.onclick = function (e) {
            const songNode = e.target.closest('.song-item:not(.active)')
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.handleActivePlaylist()
                    _this.scrollToActiveSong()
                    audio.play()
                }
                if (optionNode) {
                }
            }
            handleRemoveAnimation().play()
        }

        // Click xem lyrics
        lyrics.onclick = function (e) {
            const lyricsNode = e.target.closest('.lyrics')
            const lyricsContentNode = e.target.closest('.lyrics .lyrics-content')
            if (lyricsNode && !lyricsContentNode) {
                lyrics.classList.toggle('active')
                lyricsTools.classList.toggle('active')
            }
        }

        // Đóng lyric và scroll top lyric
        lyricsTools.onclick = function (e) {
            const closeBtn = e.target.closest('.tools .close-btn')
            const scrollTopBtn = e.target.closest('.tools .scroll-top-btn')
            if (closeBtn) {
                lyrics.classList.remove('active')
                lyricsTools.classList.remove('active')
            }
            if (scrollTopBtn) {
                lyrics.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }

    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        singerTitle.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        lyricsContent.innerHTML = this.currentSong.lyrics
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    playRandomSong: function () {
        let newIndex

        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
            if (this.randomIndexArray.length === this.songs.length) {
                this.randomIndexArray = []
            }
        } while (newIndex === this.currentIndex ||
            this.randomIndexArray.includes(newIndex)
        )
        this.randomIndexArray.push(newIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="btn-favorite far fa-heart"></i>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        songList.innerHTML = htmls.join('')
    },
    handleActivePlaylist: function () {
        const allSongs = document.querySelectorAll('.song-item')
        allSongs.forEach((song, index) => {
            song.classList.remove('active')
            if (index === this.currentIndex) {
                song.classList.add('active')
            }
        })
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song-item.active').scrollIntoView({
                bahavior: 'smooth',
                block: this.currentIndex === 0 ? 'end' : 'nearest',
            })
        }, 250)
    },
    start: function () {

        this.loadConfig()

        this.defineProperties()

        this.render()

        this.handleEvents()

        this.loadCurrentSong()

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()