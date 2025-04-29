// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// 标准语言 key => URL 前缀映射
export const localePrefixMap: { [key: string]: string } = {
  "en-US": "en",
  "en-GB": "uk",
  "en-AU": "au",
  "en-CA": "ca",
  "de-DE": "de",
  "fr-FR": "fr",
  "es-ES": "es",
};

export const defaultLocaleKey = "en-US";
const defaultPrefix = localePrefixMap[defaultLocaleKey]; // 'en'
const supportedLocaleKeys = Object.keys(localePrefixMap);
const supportedPrefixes = Object.values(localePrefixMap);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 当前路径是否带语言前缀
  const currentPrefix = supportedPrefixes.find((prefix) =>
    pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );

  // ✅ 情况 1：默认语言带前缀 → 重定向去掉前缀
  if (currentPrefix === defaultPrefix) {
    const newPath =
      pathname === `/${defaultPrefix}`
        ? "/"
        : pathname.replace(`/${defaultPrefix}`, "");
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url);
  }

  // ✅ 情况 2：非默认语言带前缀 → 放行
  if (currentPrefix) {
    return NextResponse.next();
  }

  // ✅ 情况 3：无前缀路径，根据浏览器语言处理
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocaleKey =
    acceptLanguage
      .split(",")
      .map((lang) => lang.trim().split(";")[0])
      .find((lang) => supportedLocaleKeys.includes(lang)) || defaultLocaleKey;
  const preferredPrefix = localePrefixMap[preferredLocaleKey];

  const url = request.nextUrl.clone();

  if (pathname === "/") {
    // 根路径处理
    if (preferredPrefix === defaultPrefix) {
      url.pathname = `/${defaultPrefix}`;
      return NextResponse.rewrite(url); // rewrite 到默认语言首页
    } else {
      url.pathname = `/${preferredPrefix}`;
      return NextResponse.redirect(url);
    }
  }

  // 非根路径情况
  if (preferredPrefix === defaultPrefix) {
    url.pathname = `/${defaultPrefix}${pathname}`;
    return NextResponse.rewrite(url); // 静默 rewrite
  } else {
    url.pathname = `/${preferredPrefix}${pathname}`;
    return NextResponse.redirect(url); // 外部跳转
  }
}

export const config = {
  matcher:[
    "/",
    "/((?!api|_next|static|.*\\..*).*)"
  ]
};
