import type { Content } from "./types";

export const vi: Content = {
  name: { first: "Nguyễn Quang", last: "Vinh", full: "Nguyễn Quang Vinh" },
  meta: {
    title: "Nguyễn Quang Vinh · Backend Engineer",
    description: "Java Backend Engineer. Kinh nghiệm thanh toán liên ngân hàng, chữ ký số và SaaS đa tenant, từ phát triển đến vận hành production.",
  },
  nav: { projects: "Dự án", experience: "Kinh nghiệm", resume: "CV", contact: "Liên hệ", menu: "Mở menu", theme: "Đổi giao diện sáng tối", language: "View in English", skip: "Chuyển đến nội dung", source: "Mã nguồn trang" },
  actions: { downloadCv: "Tải CV", viewProjects: "Xem dự án", caseStudy: "Đọc case study", visitSite: "Xem trang web", allProjects: "Tất cả 9 dự án", fullExperience: "Toàn bộ kinh nghiệm và học vấn", print: "In", backToProjects: "Tất cả dự án", home: "Về trang chủ", viewArchitecture: "Xem kiến trúc", seeSimulation: "Xem luồng này chạy" },
  cvFile: "/NguyenQuangVinh_CV_VI.pdf",
  hero: {
    eyebrow: "Backend Engineer",
    statement: "Java Backend Engineer với 3 năm kinh nghiệm về thanh toán liên ngân hàng, chữ ký số và SaaS đa tenant. Tôi xây dựng service, rồi tự thiết lập và release lên production.",
    scroll: "Cuộn để khám phá",
  },
  labels: { about: "Hồ sơ", simulation: "Demo trực tiếp", work: "Case study", experience: "Sự nghiệp", contact: "Kết nối" },
  facts: [["3 năm", "kinh nghiệm backend"], ["9 dự án", "ngân hàng, fintech, SaaS"], ["2 nền tảng", "phụ trách release production"], ["Giải thưởng 2025", "Highest Potential Employee"]],
  about: {
    title: "Về *tôi*",
    body: "Tôi đi lên từ ngân hàng và fintech, nơi giao dịch trùng hay callback bị mất đều gây hậu quả thật. Tôi cũng tự thiết lập và release môi trường production cho các service của mình.",
    focus: [
      ["Xây dựng", "Java 17 & 21, Spring Boot, Spring Security, Spring Cloud, MyBatis, JPA"],
      ["Kết nối", "REST, Kafka, Toss Payments, Kakao AlimTalk, ISO 20022, HSM (PKCS#11)"],
      ["Lưu trữ", "PostgreSQL, MySQL, Oracle, SQL Server, Redis"],
      ["Vận hành", "AWS ECS Fargate, RDS, S3, CloudFront, Docker, GitLab CI, GitHub Actions, Linux"],
    ],
  },
  work: { title: "Dự án *tiêu biểu*" },
  experience: {
    title: "Kinh nghiệm *làm việc*",
    pageTitle: "Kinh nghiệm",
    pageIntro: "Ba năm làm Java backend, từ các nền tảng ngân hàng đến sản phẩm SaaS cho khách hàng Hàn Quốc.",
    awardsTitle: "Ghi nhận",
    awards: ["Highest Potential Employee 2025, Unit Technology Corporation", "Thành viên Most Productive Team 2025, Unit Technology Corporation"],
    educationTitle: "Học vấn và chứng chỉ",
    education: [
      { school: "Đại học Cần Thơ", detail: "Kỹ thuật phần mềm", date: "09/2021 – 05/2025" },
      { school: "Linux Professional Institute (LPI)", detail: "Chứng chỉ Linux", date: "12/2024" },
    ],
  },
  contact: { title: "Liên *hệ*" },
  simulation: {
    title: "Xem hệ thống *chạy*",
    intro: "Ba luồng thật của S-Space: một request bình thường, một callback thanh toán bị mất, và một lần release production.",
    label: "Tình huống",
    caption: "Mô phỏng giản lược các luồng của S-Space, không phải dữ liệu thật.",
    scenarios: {
      request: { label: "Request", logs: ["Request tới CloudFront", "Chuyển tiếp tới ALB", "Định tuyến tới service trên ECS Fargate", "Truy vấn RDS Multi-AZ", "Trả kết quả về service"] },
      lost: { label: "Mất callback", logs: ["Service xác nhận thanh toán với Toss", "Callback thành công không đến nơi", "Đơn hàng vẫn ở trạng thái chờ", "Job reconciliation kiểm tra thanh toán", "Toss báo thanh toán thành công", "Khôi phục đơn hàng trong database"] },
      release: { label: "Release", logs: ["GitLab CI đẩy image lên ECR", "ECS Fargate deploy image mới", "Release hoàn tất"] },
    },
  },
  projectsPage: { title: "Dự án", intro: "Chín dự án về ngân hàng, chữ ký số và SaaS. Thông tin khách hàng chỉ dừng ở mức kỹ thuật chung." },
  caseStudy: { problem: "Bài toán", architecture: "Kiến trúc", delivered: "Công việc đã làm", decisions: "Quyết định chính", stack: "Công nghệ", simplified: "Sơ đồ đã giản lược, không có chi tiết nội bộ của khách hàng." },
  resume: {
    title: "CV",
    profileTitle: "Tóm tắt",
    profile: "Java Backend Engineer với 3 năm kinh nghiệm, chủ yếu trong ngân hàng và fintech: nền tảng chữ ký số tích hợp HSM/PKI và VNeID, tự động hóa tài liệu cho Standard Chartered Bank, và cổng thanh toán liên ngân hàng NAPAS ACH. Hiện là backend chính của một SaaS đa tenant và phụ trách release production cho hai nền tảng đang chạy.",
    skillsTitle: "Kỹ năng",
    skills: [
      ["Lĩnh vực", "Ngân hàng và fintech (chữ ký số/PKI, thanh toán liên ngân hàng, cổng thanh toán, quy trình tài liệu), SaaS đa tenant"],
      ["Backend", "Java (17, 21), Spring Boot, Spring Security (JWT, OAuth2), Spring Cloud, MyBatis, JPA/Hibernate, QueryDSL, Flyway"],
      ["Kiến trúc", "Thiết kế RESTful API, microservices, hexagonal architecture, event-driven (Kafka), multi-tenancy, RBAC"],
      ["Dữ liệu và messaging", "PostgreSQL, MySQL, Oracle, SQL Server, Redis, Apache Kafka"],
      ["Tích hợp", "Toss Payments, Kakao AlimTalk, đăng nhập mạng xã hội OAuth2, ký PDF (PAdES, PKCS#7) với HSM (PKCS#11), Activiti BPMN"],
      ["DevOps và công cụ", "Docker, GitLab CI, GitHub Actions, AWS (ECS Fargate, RDS, S3, CloudFront), Linux (chứng chỉ LPI), JUnit 5, Mockito, Git"],
    ],
    experienceTitle: "Kinh nghiệm",
    educationTitle: "Học vấn và chứng chỉ",
    note: "Liên hệ: contact@vinhnq.com · vinhnq.com · github.com/Nqvinh7603 · linkedin.com/in/nqvinh76",
  },
  notFound: { title: "Không tìm thấy đường dẫn này.", body: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi." },
  jobs: [
    { company: "Wala-ICT", title: "Backend Software Engineer", date: "04/2026 – Hiện tại", note: "Phát triển sản phẩm cho khách hàng Hàn Quốc. Backend chính của một SaaS đa tenant, phụ trách release production cho các nền tảng đang chạy.", projects: "BitBuild · S-Space · Miribom" },
    { company: "Straffico", title: "Backend Engineer", date: "08/2025 – Hiện tại", note: "Nền tảng quản lý dự án và chi phí cho doanh nghiệp xây dựng. Phát triển tính năng backend và quy trình release production blue-green.", projects: "Straffico" },
    { company: "Unit Technology Corporation", title: "Backend Software Engineer, R&D", date: "11/2024 – 03/2026", note: "Giải pháp chữ ký số và ngân hàng. Highest Potential Employee 2025, Most Productive Team 2025.", projects: "Signature Hub · Paperless · Easy Doc · ACH Gateway · JCanary Core" },
    { company: "Laptrinhjavaweb", title: "Backend Developer", date: "09/2023 – 10/2024", note: "Phát triển backend Java.", projects: "Java · Spring Boot" },
  ],
  projects: [
    {
      slug: "straffico", name: "Straffico", company: "Straffico", domain: "Quản lý dự án và chi phí cho doanh nghiệp xây dựng", role: "Backend Engineer", meta: "Dự án nhóm · Java 21",
      problem: "Doanh nghiệp xây dựng cần công trường, kho, kế toán và quản lý cùng làm việc trên một bộ số liệu.",
      points: [
        "Xây dựng deploy bằng GitHub Actions cho dev và prod: build JAR trên runner, rồi release bằng blue-green switch không downtime.",
        "Thêm khóa deploy để hai repository không bao giờ release cùng lúc lên một server.",
        "Đối soát số dư quỹ thực tế và số dư hệ thống, đồng thời xây dựng API phân tích, report builder và lịch nguồn lực.",
        "Thêm thông báo Web Push, audit hoạt động người dùng và mã yêu cầu hỗ trợ liên kết giữa response với log.",
      ],
      decisions: [
        { title: "Release bằng blue-green switch", body: "Bản mới chạy song song với bản đang hoạt động rồi mới chuyển traffic, nên release production không cần thời gian dừng." },
        { title: "Tách số dư thực tế và số dư hệ thống", body: "Hai số dư được lưu riêng rồi đối soát, nên chênh lệch luôn nhìn thấy được thay vì bị ghi đè." },
      ],
      stack: ["Java 21", "MyBatis", "Redis", "GitHub Actions"],
    },
    {
      slug: "s-space", name: "S-Space", company: "Wala-ICT", domain: "SaaS quản lý studio Pilates và fitness", role: "Backend Engineer", meta: "Team 5 người · đang chạy tại s-space.co.kr",
      problem: "Một nền tảng microservices đang chạy thật cần môi trường production có tài liệu rõ ràng và quy trình release đáng tin cậy.",
      points: [
        "Thiết lập và viết tài liệu production trên AWS: VPC với private subnet, ECS Fargate, RDS Multi-AZ, ALB và CloudFront.",
        "Phụ trách release production qua GitLab CI → ECR → ECS Fargate, là người bảo trì backend chính của các service auth, user và center.",
        "Xây dựng job reconciliation để khôi phục thanh toán bị mất callback thành công và hết hạn các giao dịch chờ quá lâu.",
        "Mở rộng Toss Payments với luồng merchant trụ sở cho đơn B2B: xác nhận idempotent, hủy và hoàn tiền, theo dõi phí và đối soát.",
        "Xây dựng kỳ tính lương cấu hình được và chuyển dữ liệu hội viên cũ bằng script chạy lại được, kiểm tra trên staging trước.",
      ],
      decisions: [
        { title: "Coi callback thanh toán là thứ có thể bị mất", body: "Callback thành công không chắc chắn đến nơi, nên job reconciliation khôi phục các thanh toán đó và hết hạn các giao dịch chờ quá lâu." },
        { title: "Viết script chuyển dữ liệu chạy lại được", body: "Dữ liệu hội viên cũ được chuyển bằng script có thể chạy lại an toàn, và kiểm tra trên staging trước khi lên production." },
      ],
      stack: ["Java 17", "ECS Fargate", "RDS MySQL", "CloudFront"],
    },
    {
      slug: "ach-gateway", name: "ACH Gateway", company: "Unit Technology Corporation", domain: "Cổng thanh toán liên ngân hàng NAPAS", role: "Backend Software Engineer", meta: "Team 12 người · ngân hàng",
      problem: "Các thông điệp liên ngân hàng cần được kiểm tra, theo dõi và đối soát giữa NAPAS với Core Banking.",
      points: [
        "Xây dựng xử lý inward deposit trên ISO 20022 pacs.008, gồm kiểm tra, quy tắc nghiệp vụ, theo dõi trạng thái và ghi log xử lý.",
        "Phát triển đối soát với dữ liệu NAPAS và Core Banking để phát hiện sai lệch.",
        "Tối ưu SQL cho log giao dịch và truy vấn trạng thái mới nhất.",
        "Xây dựng luồng copy transaction camt.033.",
      ],
      decisions: [
        { title: "Đối chiếu với cả hai phía", body: "Đối soát so giao dịch nội bộ với dữ liệu NAPAS và Core Banking, nên sai lệch phát sinh ở phía nào cũng thấy được." },
        { title: "Ghi lại quá trình, không chỉ kết quả", body: "Xử lý inward deposit có theo dõi trạng thái và log xử lý, đi cùng kiểm tra và quy tắc nghiệp vụ." },
      ],
      stack: ["Spring Boot", "SQL Server", "Redis", "ISO 20022"],
    },
    {
      slug: "bitbuild", name: "BitBuild", company: "Wala-ICT", domain: "SaaS đa tenant về mua sắm xây dựng", role: "Main Backend Engineer", meta: "Team 4 người · từ sprint đầu đến production",
      problem: "Một sản phẩm đa tenant mới cần ranh giới kiến trúc rõ ràng và luồng mua hàng không bao giờ bị trùng.",
      points: [
        "Tái cấu trúc mã nguồn thành hexagonal architecture nhiều module, dùng ArchUnit test để giữ ranh giới.",
        "Dùng idempotency key chống trùng đơn mua hàng và advisory lock để job định kỳ chỉ chạy một lần.",
        "Thiết lập GitLab CI và deploy Docker Compose có health check.",
        "Xây dựng xác thực đa tenant: JWT với refresh token rotation, thu hồi token bằng Redis, đăng nhập mạng xã hội và RBAC theo phạm vi dữ liệu.",
        "Phụ trách domain model, schema PostgreSQL và REST API cho các module mua sắm, hợp đồng, phê duyệt và nhà cung cấp.",
      ],
      decisions: [
        { title: "Giữ kiến trúc bằng test", body: "ArchUnit test ngăn ranh giới giữa các lớp bị phá vỡ khi mã nguồn hexagonal nhiều module lớn dần." },
        { title: "Giả định mọi lần gửi và mọi job đều có thể lặp", body: "Idempotency key chặn gửi trùng đơn mua hàng, còn advisory lock của PostgreSQL giúp job định kỳ chỉ chạy một lần trên nhiều instance." },
      ],
      stack: ["Java 21", "PostgreSQL", "Redis", "GitLab CI"],
    },
    {
      slug: "signature-hub", name: "Signature Hub", company: "Unit Technology Corporation", domain: "Nền tảng ký số tập trung", role: "Backend Software Engineer", meta: "Team 4 người · ngân hàng và doanh nghiệp",
      problem: "Các hệ thống khách hàng cần một đường ký chung tới nhiều nhà cung cấp mà không lưu nội dung tài liệu tập trung.",
      points: [
        "Xây dựng các service backend để ký qua HSM, nhà cung cấp ký từ xa và VNeID.",
        "Tham gia luồng ký hướng sự kiện giữa các microservice Spring Boot trên Kafka.",
        "Xây dựng ký và kiểm tra chữ ký PDF (PAdES, PKCS#7), tích hợp HSM qua PKCS#11.",
      ],
      decisions: [
        { title: "Xử lý ký bất đồng bộ", body: "Yêu cầu được phát thành sự kiện, xử lý bất đồng bộ và theo dõi bằng mã giao dịch." },
        { title: "Không giữ nội dung nhạy cảm ở hub", body: "Nội dung request giữa agent và hub được mã hóa, còn service data và audit chỉ lưu metadata." },
      ],
      stack: ["Spring Cloud", "Kafka", "PostgreSQL", "PKCS#11"],
    },
    {
      slug: "miribom", name: "Miribom", company: "Wala-ICT", domain: "Đặt lịch làm đẹp với mô phỏng khuôn mặt bằng AI", role: "Backend Engineer", meta: "Team 9 người · đang chạy tại miribom.kr",
      points: [
        "Xây dựng trọn thông báo Kakao AlimTalk: API quản lý mẫu và bộ gửi theo outbox với SKIP LOCKED, retry có back-off và dự phòng SMS.",
        "Tích hợp backend Spring với service AI FastAPI: job bất đồng bộ có polling trạng thái, giới hạn retry và khóa chống xếp hàng trùng.",
        "Phụ trách deploy production và chuyển repository cùng CI/CD từ GitLab tự host sang GitHub.",
        "Xây dựng luồng hoàn tiền và thanh toán thẻ cho tiền đặt cọc với Toss Payments.",
      ],
      stack: ["Java 21", "Axon", "PostgreSQL", "GitHub Actions"],
    },
    {
      slug: "paperless", name: "Paperless", company: "Unit Technology Corporation", domain: "Module chữ ký số", role: "Backend chính của module ký", meta: "Team 6 người",
      points: [
        "Xây dựng ký nội bộ, ký bên ngoài qua email và tích hợp eSign bên thứ ba, gồm VNeID.",
        "Xây dựng hoàn tác chữ ký và đổi người ký để luồng đang chạy có thể quay lại hoặc đổi người mà không cần làm lại từ đầu.",
        "Sửa lỗi và refactor module để giữ các luồng ký nhiều bước ổn định.",
      ],
      stack: ["Spring Boot", "PostgreSQL", "PAdES"],
    },
    {
      slug: "easy-doc", name: "Easy Doc", company: "Unit Technology Corporation", domain: "Tự động hóa tài liệu cho Standard Chartered", role: "Backend Software Engineer", meta: "Team 5 người · ngân hàng",
      points: [
        "Xây dựng API backend cho biểu mẫu số và tự động hóa tài liệu trên nền Paperless.",
        "Xây dựng xử lý tài liệu và quy trình phê duyệt nhiều cấp với Activiti BPMN.",
        "Phát triển batch job Quartz trên SQL Server và viết unit test bằng JUnit, Mockito.",
      ],
      stack: ["Spring Boot", "Activiti BPMN", "SQL Server"],
    },
    {
      slug: "jcanary-core", name: "JCanary Core", company: "Unit Technology Corporation", domain: "Framework Java và Spring nội bộ", role: "Backend Software Engineer", meta: "Team 5 người · nền tảng nội bộ",
      points: ["Đóng góp các module dùng lại: quản lý secret với HashiCorp Vault, truy cập nhiều loại database, trừu tượng hóa lưu trữ và tiện ích ký HSM dùng chung."],
      stack: ["Spring Boot", "Vault", "Flyway"],
    },
  ],
};
