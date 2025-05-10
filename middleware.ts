// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// 标准语言 key => URL 前缀映射
export const localePrefixMap: { [key: string]: string } = {
  "en-US": "en", // 默认语言
  "en-GB": "uk",
  "en-AU": "au",
  "en-CA": "ca",
  "de-DE": "de",
  "fr-FR": "fr",
  "es-ES": "es",
};

export const defaultLocaleKey = "en-US";
const defaultPrefix = localePrefixMap[defaultLocaleKey]; // 'en'
// const supportedLocaleKeys = Object.keys(localePrefixMap); // 不再需要用于浏览器语言检测
const supportedPrefixes = Object.values(localePrefixMap);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源、API 路由以及 sitemap 特定路径
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 检查当前路径是否以支持的语言前缀开头
  const currentPathStartsWithSupportedPrefix = supportedPrefixes.find(
    (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );

  // ✅ 情况 1：如果路径以默认语言前缀开头，则重定向到去掉此前缀的路径
  // 例如: /en/products -> /products; /en -> /
  if (currentPathStartsWithSupportedPrefix === defaultPrefix) {
    // 更严谨的替换逻辑
    let newPathname = "/";
    if (pathname !== `/${defaultPrefix}`) { // 如果不是仅仅 /en
        newPathname = pathname.substring(defaultPrefix.length + 1); //去掉 /en
    }


    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.redirect(url);
  }

  // ✅ 情况 2：如果路径以非默认语言的前缀开头，则直接放行
  // 例如: /de/products -> /de/products (正常访问)
  if (currentPathStartsWithSupportedPrefix && currentPathStartsWithSupportedPrefix !== defaultPrefix) {
    return NextResponse.next();
  }

  // ✅ 情况 3：路径没有已知的语言前缀 (也不是默认语言前缀，因为那已被情况1处理)
  // 这意味着它本身就应该是默认语言的路径，不需要进行基于浏览器语言的重定向或重写。
  // 例如: /products -> /products (视为英文内容)
  // 例如: / -> / (视为英文内容)
  // 在这种情况下，我们什么都不做，直接让 Next.js 处理请求，它会渲染对应的页面。
  // Next.js 应该配置为将无前缀的路径映射到默认语言 (en) 的内容。
  if (!currentPathStartsWithSupportedPrefix) {
    return NextResponse.next();
  }

  // 作为备用，如果以上逻辑有遗漏，默认放行
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|static|.*\\..*).*)" // 匹配所有非特定排除的路径
  ]
};