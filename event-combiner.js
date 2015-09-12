function call_if_both_valid(param_a, param_b, out_func) {
    if (param_a && param_b) {
        out_func(param_a, param_b);
    }
}

function combineEvents(in_emitter, event_a, event_b, out_func) {
    var event_a_parameter = null;
    var event_b_parameter = null;

    function call_with_both() {
        call_if_both_valid(event_a_parameter, event_b_parameter, out_func);
    }

    in_emitter.on(event_a, function(param) {
        event_a_parameter = param;
        call_with_both();
    });

    in_emitter.on(event_b, function(param) {
        event_b_parameter = param;
        call_with_both();
    });
}

module.exports = {
    combineEvents: combineEvents
};
