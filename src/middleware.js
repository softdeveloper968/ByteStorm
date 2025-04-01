import {NextRequest, NextResponse} from "next/server"

/**
 * This is mainly for redirection purposes.
 * @param {NextRequest} request
 * @return {NextResponse<unknown>}
 */
export function middleware(request) {
	const baseUrl = request.nextUrl.origin;
	const path = request.nextUrl.pathname;
	const buyers = /\/buyers\w+/;
	const about = /\/aboutus/;
	const lendersubs = /\/lenders.+/
	switch (true) {
		case buyers.test(path):
			return NextResponse.redirect(baseUrl + "/buyers", {status: 302});
		case about.test(path):
			return NextResponse.redirect(baseUrl + "/about", {status: 302});
		case lendersubs.test(path):
			return NextResponse.redirect(baseUrl + "/find-lender", {status: 302});
		default:
			return NextResponse.next();
	}
}
//www.mustwants.com/buyersintro2.html
//www.mustwants.com/footerfaq.html
//	https://www.mustwants.com/aboutus.html
//https://www.mustwants.com/buyershomebuyers.html
//	https://www.mustwants.com/lendersubcribe.html
