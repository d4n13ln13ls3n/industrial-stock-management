@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) {

        responseContext.getHeaders().clear();

        responseContext.getHeaders().putSingle(
            "Access-Control-Allow-Origin",
            "https://industrial-stock-management.vercel.app"
        );

        responseContext.getHeaders().putSingle(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );

        responseContext.getHeaders().putSingle(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
    }
}