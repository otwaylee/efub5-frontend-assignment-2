# 🗂️ EFUB Week 07 - Next.js 게시판 (2)

Next.js App Router + Pages Router 혼합 구조로 만든 게시판을 **NextAuth 기반 인증/권한 시스템**, **댓글/좋아요 등 인터랙션**, **역할(Role) 관리**까지 확장하였습니다. MongoDB Atlas를 사용하며 GitHub OAuth와 자체 자격 증명 로그인을 동시에 지원합니다.

---

## 🚀 기술 스택

| 분야            | 사용 기술                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------- |
| Framework       | Next.js 16(App Router UI) + Pages Router API                                              |
| Language        | TypeScript                                                                                |
| Auth            | NextAuth.js (GitHub OAuth + Credentials, Role-based SessionProvider)                      |
| Styling         | Tailwind CSS + 전역 유틸 클래스                                                            |
| Database        | MongoDB Atlas (post/comment/user 컬렉션)                                                  |
| 기타            | ESLint / Prettier / prettier-plugin-tailwindcss / simple-import-sort, Vercel dev server   |

---

## ✨ 이번 주차 구현 기능

### 1. 인증 & 권한
- `/login` 페이지에서 **GitHub 또는 Credentials** 중 선택 로그인.
- `/register`에서 bcrypt로 암호화된 비밀번호와 `role: 'normal'` 기본값 저장.
- OAuth 로그인 시에도 `user` 컬렉션에 자동으로 사용자/역할 정보를 생성 또는 동기화.
- `SessionProvider`를 도입해 모든 클라이언트 컴포넌트에서 `useSession` 사용 가능.
- NextAuth JWT/Session 타입 보강(`next-auth-d.ts`)으로 `role` 안전하게 사용.

### 2. 게시글 & 상호작용
- CRUD: `/write`, `/list`, `/detail/[id]`, `/edit/[id]`.
- 좋아요 API (`/api/post/like`): 로그인 사용자만 가능, 중복 방지, 실시간 카운트 UI.
- 댓글 기능: `/api/comment` GET/POST, `CommentSection` 클라이언트 컴포넌트에서 폼 제출·리스트 조회.

### 3. 역할 기반 관리자 기능
- 사용자 문서에 `role: 'normal' | 'admin'`.
- 게시글 삭제/수정 API에서 **작성자 또는 관리자만 허용**하도록 검증.
- 리스트/상세/수정 페이지 UI에서도 권한에 맞게 버튼 노출 및 접근 제한.


### 4. 기타 UX 개선
- Header에 세션 상태 표시 및 로그인/로그아웃 버튼 조합.
- 로그인 성공 시 루트 페이지로 이동하도록 `callbackUrl` 사용.
- MongoDB 컬렉션을 분리(`post`, `comment`, `user`)하고 서비스 레이어(`services/*.ts`)로 데이터 조회 분리

---

## 📂 프로젝트 구조
```
week07/my-app
├─ src/app
│  ├─ layout.tsx / SessionProvider.tsx
│  ├─ page.tsx (메인)
│  ├─ list/page.tsx · detail/[id]/page.tsx · edit/[id]/page.tsx · write/page.tsx
│  ├─ login/page.tsx · register/page.tsx
│  ├─ detail/[id]/CommentSection.tsx · LikeBtn.tsx 등 클라이언트 컴포넌트
│  └─ components/Header.tsx, NavActions.tsx, LoginBtn.tsx, LogoutBtn.tsx
│
├─ src/pages/api
│  ├─ auth/[...nextauth].ts · auth/register.ts
│  ├─ comment.ts
│  └─ post/{create,edit,delete,like,readDetail,readList}.ts
│
├─ src/models/post.ts · src/models/comment.ts
├─ src/app/services/postService.ts · commentService.ts
└─ src/utils/database.ts
```


## 💡 트러블슈팅 & 배운 점

### JWT 토큰 문제 (JWEDecryptionFailed / JWT_SESSION_ERROR)

서버를 강제 새로고침하거나 dev 서버를 재시작한 뒤, `await getServerSession(authOptions)`를 호출하는 `layout.tsx:32` 등에서 아래 오류가 발생

```
[next-auth][error][JWT_SESSION_ERROR]
JWEDecryptionFailed: decryption operation failed
```

#### 발생 상황
- GitHub / Credentials 로그인 직후에는 정상
- 이후 dev 서버 재시작 또는 브라우저 강제 새로고침 후부터 쿠키 복호화 실패

#### 근본 원인
1. NextAuth는 세션 정보를 **JWT로 쿠키에 저장**하고 `NEXTAUTH_SECRET`으로 암복호화.
2. 초기에는 `NEXTAUTH_SECRET`을 설정하지 않아 dev 서버가 매번 임의의 secret을 생성.
3. 서버 재시작 후에는 secret이 바뀌었는데 브라우저에는 **이전 secret으로 암호화된 JWT**가 남아 있어 복호화가 실패. 

#### 해결 방법
1. 충분히 긴 랜덤 문자열을 secret으로 고정
   ```
   jose newkey -s 512 -t oct -a HS512
    // nextauth.js docs에 설명하였으나 작동하지 않아 아래 방법으로 키 생성 
    
   openssl rand -base64 32
   ```
   NEXTAUTH_SECRET="위에서 생성한 문자열"
   
2. 브라우저 DevTools → Application → Cookies에서 기존 `next-auth.session-token` 등 모든 쿠키 삭제.
3. dev 서버 재시작 후 다시 로그인하면 동일한 secret으로 암복호화가 가능하여 오류 해결


