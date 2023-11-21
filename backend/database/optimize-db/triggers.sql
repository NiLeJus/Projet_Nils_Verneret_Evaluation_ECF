DELIMITER 
//

--* Trigger that updates the processed_at date field when a request is processed
CREATE TRIGGER update_processed_date
    BEFORE UPDATE ON requests
    FOR EACH ROW
    BEGIN
        IF NEW.is_processed = true AND OLD.is_processed = false THEN
            SET NEW.processed_at = NOW();
        END IF;
    END;


--* Trigger that name the transmission according to its type and speed number
CREATE TRIGGER before_transmissions_insert
    BEFORE INSERT ON transmissions
    FOR EACH ROW
    BEGIN
    IF NEW.transmission_type = 'automatic' THEN
        SET NEW.name = CONCAT('Automatic ', NEW.speed_number);
    ELSE
        SET NEW.name = CONCAT('Manual ', NEW.speed_number);
    END IF;
    END$$

//
DELIMITER ;
