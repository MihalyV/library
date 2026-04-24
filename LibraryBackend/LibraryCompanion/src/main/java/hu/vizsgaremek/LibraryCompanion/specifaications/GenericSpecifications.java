package hu.vizsgaremek.LibraryCompanion.specifaications;

import org.springframework.data.jpa.domain.Specification;

public class GenericSpecifications {

    public static <T> Specification<T> hasAttribute(String attribute, Object value) {
        return (root, query, builder) -> builder.equal(root.get(attribute), value);
    }

    public static <T> Specification<T> likeAttribute(String attribute, String value) {
        return (root, query, builder) ->
                builder.like(builder.lower(root.get(attribute)), "%" + value.toLowerCase() + "%");
    }

    public static <T> Specification<T> greaterThan(String attribute, Comparable<?> value) {
        return (root, query, builder) -> builder.greaterThan(root.get(attribute), value);
    }

    public static <T> Specification<T> lessThan(String attribute, Comparable<?> value) {
        return (root, query, builder) -> builder.lessThan(root.get(attribute), value);
    }
}
