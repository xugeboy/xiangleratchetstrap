// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

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
const supportedPrefixes = Object.values(localePrefixMap);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // 1. 跳过特定路径
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. 检查当前路径是否已经带有语言前缀
  const currentPathPrefix = supportedPrefixes.find(
    (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );

  // 2a. 如果路径以默认语言前缀开头 (例如 /en/products 或 /en)
  //    则重定向到去掉此前缀的路径 (例如 /products 或 /)
  //    这样可以确保默认语言的规范 URL 是不带 /en 前缀的
  if (currentPathPrefix === defaultPrefix) {
    let newPathname = "/";
    // 如果路径是 "/en/some/path", 移除 "/en" 得到 "/some/path"
    // 如果路径仅仅是 "/en", 移除 "/en" 得到 "/"
    if (pathname.length > `/${defaultPrefix}`.length) { // 检查是否是 /en/something 而不仅仅是 /en
      newPathname = pathname.substring(`/${defaultPrefix}`.length);
    }
    url.pathname = newPathname;
    return NextResponse.rewrite(url);
  }

  // 2b. 如果路径以非默认语言的前缀开头 (例如 /de/products)
  //    则直接放行，这是正确的访问方式
  if (currentPathPrefix && currentPathPrefix !== defaultPrefix) {
    return NextResponse.next();
  }

  // 3. 处理不带语言前缀的路径 (例如 /products 或 /)
  //    这些路径应该被视为默认语言（英文）的内容
  //    我们使用 rewrite 将其内部路由到带有默认语言前缀的路径
  //    这样 RootLayout 中的 params.lang 就能获取到 'en'
  if (!currentPathPrefix) {
    // 对于根路径 / , 重写到 /en
    // 对于 /products , 重写到 /en/products
    url.pathname = `/${defaultPrefix}${pathname === "/" ? "" : pathname}`;
    // 如果 pathname 是 "/" 那么 `/${defaultPrefix}${pathname}` 会变成 `/en/`
    // 我们希望根路径 / rewrite 成 /en (而不是 /en/) 以匹配 Next.js 路由 app/[lang]/page.tsx
    // 所以对于根路径，我们直接 rewrite 到 /en
    if (pathname === "/") {
        url.pathname = `/${defaultPrefix}`;
    } else {
        url.pathname = `/${defaultPrefix}${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // 默认放行 (理论上不应执行到这里，因为所有情况都应被覆盖)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};